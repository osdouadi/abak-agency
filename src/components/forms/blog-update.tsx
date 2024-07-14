"use client";

import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "../global/file-upload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";
import { BlogData } from "@/types/blog-data";
import { getBlogById, updateBlog } from "@/queries/blog";
import { BlogSchema } from "@/lib/zod-schema/blog-schema";

const BlogUpdate = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const { id } = useExtractIdFromPath();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogData = async (id: string) => {
      try {
        const response = await getBlogById(id);
        const parsedResponse = JSON.parse(response);
        setBlogData(parsedResponse);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "فشل الحصول على التصنيف",
          description: "الرجاء المحاولة مرة اخرى!",
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
        title: "تعديل المقال بنجاح",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل تعديل المقال",
        description: "الرجاء المحاولة مرة اخرى!",
      });
    }
  };

  return (
    <AlertDialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader className="w-full flex flex-row justify-between">
              <div>
                <CardTitle>البيانات الأساسية للمقال</CardTitle>
                <CardDescription>
                  يجب إدخال المعلومات التالية من أجل إنشاء مقال جديد
                </CardDescription>
              </div>
              <Link
                href={"/admin-dashboard/blogs"}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5"
              >
                عودة الى المقالات
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
                    <FormLabel>صورة المقال</FormLabel>
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
                      <FormLabel>عنوان المقال</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان المقال" {...field} />
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
                      <FormLabel>عنوان المقال باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="عنوان المقال باللغة الإنجليزية"
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
                      <FormLabel>وصف المقال</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف المقال"
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
                      <FormLabel>وصف التصنيف باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف المقال باللغة الإنجليزية"
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
                      <FormLabel>وصف المقال</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف المقال"
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
                      <FormLabel>وصف التصنيف باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف المقال باللغة الإنجليزية"
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
              <CardTitle>إعدادات السيو</CardTitle>
              <CardDescription>
                اعدادات خاصة بتحسين محركات البحث الخصة بصفحة المقال
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
                      <FormLabel>عنوان صفحة المقال</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان صفحة المقال" {...field} />
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
                      <FormLabel>عنوان صفحة المقال باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="عنوان صفحة المقال باللغة الإنجليزية"
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
                      <FormLabel>وصف صفحة المقال</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف صفحة المقال"
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
                      <FormLabel>وصف صفحة المقال باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف صفحة المقال باللغة الإنجليزية"
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
              {isPending ? <BtnLoading /> : "إدراج المقال"}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default BlogUpdate;
