"use client";

import React from "react";
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
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import FileUpload from "../global/file-upload";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { Undo2 } from "lucide-react";

import { createBlog } from "@/queries/blog";
import { BlogSchema } from "@/lib/zod-schema/blog-schema";
import { constants } from "@/config/constants";
import { useExtractLocaleFromPath } from "@/hooks/useExtractLocaleFromPath";

const BlogDetails = () => {
  const tResponse = useTranslations("responses");
  const tDashboardBlog = useTranslations("dashboard.blog");
  const tCallToAction = useTranslations("callToAction");

  const locale = useExtractLocaleFromPath()
  const { toast } = useToast();

  const form = useForm<z.infer<typeof BlogSchema>>({
    mode: "onChange",
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: {
        ar: "",
        en: "",
      },
      shortDescription: {
        ar: "",
        en: "",
      },
      longDescription: {
        ar: "",
        en: "",
      },
      blogImage: "",
      SEOSettings: {
        pageTitle: {
          ar: "",
          en: "",
        },
        pageDescription: {
          ar: "",
          en: "",
        },
      },
    },
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof BlogSchema>) => {
    try {
      await createBlog(values);
      toast({
        title: tResponse("blogAddedSuccessfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToAddBlog"),
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
                <CardTitle>{tDashboardBlog("detailsTitle")}</CardTitle>
                <CardDescription>
                  {tDashboardBlog("detailsDescription")}{" "}
                </CardDescription>
              </div>
              <Link
                href={constants.links.adminBlogs}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white text-sm py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5 absolute top-1 md:relative"
              >
                {tCallToAction("backToEngineeringCategories")}
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
                    <FormLabel> {tDashboardBlog("imageLabel")}</FormLabel>
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
                      <FormLabel>{tDashboardBlog("titleAR")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("titleAR")}
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
                      <FormLabel>{tDashboardBlog("titleEN")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("titleEN")}
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
                        {tDashboardBlog("shortDescriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog("shortDescriptionAR")}
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
                        {tDashboardBlog("shortDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog("shortDescriptionEN")}
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
                        {tDashboardBlog("longDescriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog("longDescriptionAR")}
                          {...field}
                          className="h-9 md:h-36"
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
                        {" "}
                        {tDashboardBlog("longDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog("longDescriptionEN")}
                          {...field}
                          className="h-9 md:h-36"
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
              <CardTitle>{tDashboardBlog("SEOSettings")} </CardTitle>
              <CardDescription>
                {tDashboardBlog("SEOSettingsDescription")}
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
                      <FormLabel>{tDashboardBlog("pageTitleAR")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("pageTitleAR")}
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
                      <FormLabel>{tDashboardBlog("pageTitleEN")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardBlog("pageTitleEN")}
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
                        {tDashboardBlog("pageDescriptionAR")}{" "}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog("pageDescriptionAR")}
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
                        {tDashboardBlog("pageDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardBlog("pageDescriptionEN")}
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
              {isPending ? <BtnLoading /> : tCallToAction("addBlog")}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default BlogDetails;
