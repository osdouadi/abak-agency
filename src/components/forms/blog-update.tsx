"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { AlertDialog } from "../ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";
import { Undo2 } from "lucide-react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "../global/file-upload";

import { useToast } from "../ui/use-toast";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";

import { BlogData } from "@/types/blog-data";
import { getBlogById, updateBlog } from "@/queries/blog";
import { BlogSchema } from "@/lib/zod-schema/blog-schema";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";

const BlogUpdate = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const tDashboardBlog = useTranslations("dashboard.blog");
  const tResponse = useTranslations("response");
  const tCallToAction = useTranslations("callToAction");

  const { id } = useExtractIdFromPath();
  const locale = useExtractLocaleFromPath();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogData = async (id: string) => {
      try {
        const response = await getBlogById(id);
        setBlogData(response);
      } catch (error) {
        toast({
          variant: "destructive",
          title: tResponse("failedToGetBlogDetails"),
          description: tResponse("pleaseTryAgain"),
        });
      }
    };

    fetchBlogData(id ?? "");
  }, [id, toast]);

  const form = useForm<z.infer<typeof BlogSchema>>({
    mode: "onChange",
    resolver: zodResolver(BlogSchema),
  });

  useEffect(() => {
    if (blogData) {
      form.reset({
        title: {
          ar: blogData?.title?.ar || "",
          en: blogData?.title?.en || "",
        },
        shortDescription: {
          ar: blogData?.shortDescription?.ar || "",
          en: blogData?.shortDescription?.en || "",
        },
        longDescription: {
          ar: blogData?.longDescription?.ar || "",
          en: blogData?.longDescription?.en || "",
        },
        blogImage: blogData?.blogImage || "",
        SEOSettings: {
          pageTitle: {
            ar: blogData?.SEOSettings?.pageTitle.ar || "",
            en: blogData?.SEOSettings?.pageTitle.en || "",
          },
          pageDescription: {
            ar: blogData?.SEOSettings?.pageDescription.ar || "",
            en: blogData?.SEOSettings?.pageDescription.en || "",
          },
        },
      });
    }
  }, [blogData, form]);

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof BlogSchema>) => {
    try {
      await updateBlog(id ?? "", values);
      toast({
        title: tResponse("blogEditedSuccessfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToEditBlog"),
        description: tResponse("pleaseTryAgain"),
      });
    }
  };

  return (
    <AlertDialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-4"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <Card>
            <CardHeader className="w-full flex justify-between flex-col-reverse md:flex-row relative">
              <div className="pt-14 md:pt-0">
                <CardTitle>
                  {tDashboardBlog("EditingBlogMainDetails")}
                </CardTitle>
                <CardDescription>
                  {tDashboardBlog("EditingBlogMainDetailsDescription")}
                </CardDescription>
              </div>
              <Link
                href={constants.links.adminBlogs}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white text-sm py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5 absolute top-1 md:relative"
              >
                {tCallToAction("backToBlogs")}
                <Undo2 strokeWidth={1.4} className="mb-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <FormField
                disabled={isPending}
                name="blogImage"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full mb-5 md:pb-6">
                    <FormLabel>{tDashboardBlog("editingBlogImage")}</FormLabel>
                    <FormControl>
                      <FileUpload
                        apiEndpoint="blogImage"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputGroup>
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="title.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingBlogTitleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("editingBlogTitleAR")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="title.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingBlogTitleEN")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("editingBlogTitleEN")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </InputGroup>
              <InputGroup>
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="shortDescription.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingBlogShortDescriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog(
                            "editingBlogShortDescriptionAR"
                          )}
                          {...field}
                          className="h-5 md:h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="shortDescription.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingBlogShortDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog(
                            "editingBlogShortDescriptionEN"
                          )}
                          {...field}
                          className="h-5 md:h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </InputGroup>
              <InputGroup>
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="longDescription.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingBlogLongDescriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog(
                            "editingBlogLongDescriptionAR"
                          )}
                          {...field}
                          className="h-5 md:h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="longDescription.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingBlogLongDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog(
                            "editingBlogLongDescriptionEN"
                          )}
                          {...field}
                          className="h-5 md:h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </InputGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{tDashboardBlog("editingSEOSettings")}</CardTitle>
              <CardDescription>
                {tDashboardBlog("editingSEOSettingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InputGroup>
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="SEOSettings.pageTitle.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingPageTitleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("editingPageTitleEN")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="SEOSettings.pageTitle.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingPageTitleEN")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("editingPageTitleEN")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </InputGroup>
              <InputGroup>
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="SEOSettings.pageDescription.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingPageDescriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog(
                            "editingPageDescriptionAR"
                          )}
                          {...field}
                          className="h-5 md:h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="SEOSettings.pageDescription.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardBlog("editingPageDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog(
                            "editingPageDescriptionEN"
                          )}
                          {...field}
                          className="h-5 md:h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </InputGroup>
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <Button
              disabled={isPending}
              type="submit"
              className="text-white"
              size={"lg"}
            >
              {isPending ? <BtnLoading /> : tCallToAction("saveEdits")}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default BlogUpdate;
