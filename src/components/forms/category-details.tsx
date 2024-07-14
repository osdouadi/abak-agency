"use client";

import React from "react";
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
import { createEngineeringCategory } from "@/queries/engineering-category";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { CategorySchema } from "@/lib/zod-schema/category-schema";

const CategoryDetails = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CategorySchema>>({
    mode: "onChange",
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      title: {
        ar: "",
        en: "",
      },
      description: {
        ar: "",
        en: "",
      },
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
      categoryIcon: "",
      categoryBanner: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    try {
      await createEngineeringCategory(values);
      toast({
        title: "إنشاء التصنيف بنجاح",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل إنشاء التصنيف",
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
                <CardTitle>البيانات الأساسية للتصنيف</CardTitle>
                <CardDescription>
                  يجب إدخال المعلومات التالية من أجل إنشاء تصنيف جديد
                </CardDescription>
              </div>
              <Link
                href={"/admin-dashboard/engineering-categories"}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5"
              >
                عودة الى التصنيفات
                <Undo2 strokeWidth={1.4} className="mb-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <InputGroup>
                <FormField
                  disabled={isPending}
                  name="categoryIcon"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>أيقونة التصنيف الهندسي</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="categoryIcon"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isPending}
                  name="categoryBanner"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>صورة التصنيف الهندسي</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="categoryBanner"
                          onChange={field.onChange}
                          value={field.value}
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
                  name="title.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>عنوان التصنيف</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان التصنيف" {...field} />
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
                      <FormLabel>عنوان التصنيف باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="عنوان التصنيف باللغة الإنجليزية"
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
                  name="SEOSettings.pageTitle.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>وصف التصنيف</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف التصنيف"
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
                  name="SEOSettings.pageTitle.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>وصف التصنيف باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف التصنيف باللغة الإنجليزية"
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
                اعدادات خاصة بتحسين محركات البحث الخصة بصفحة التصنيف
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InputGroup>
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="SEOSettings.pageDescription.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>عنوان صفحة التصنيف</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان صفحة التصنيف" {...field} />
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
                        عنوان صفحة التصنيف باللغة الإنجليزية
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="عنوان صفحة التصنيف باللغة الإنجليزية"
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
                  name="description.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>وصف صفحة التصنيف</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف صفحة التصنيف"
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
                  name="description.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>وصف صفحة التصنيف باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف صفحة التصنيف باللغة الإنجليزية"
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
              {isPending ? <BtnLoading /> : "إدراج التصنيف"}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default CategoryDetails;
