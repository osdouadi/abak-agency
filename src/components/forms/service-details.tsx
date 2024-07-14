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
import { getEnginneringCategoryList } from "@/queries/engineering-category";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createEngineeringService } from "@/queries/engineering-service";
import { ServiceSchema } from "@/lib/zod-schema/service-schema";
import { Category } from "@/types/category";

const ServiceDetails = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ServiceSchema>>({
    mode: "onChange",
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      title: {
        ar: "",
        en: "",
      },
      description: {
        ar: "",
        en: "",
      },
      category: "",
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
      serviceIcon: "",
      serviceBanner: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await getEnginneringCategoryList();
        const parsedResponse = JSON.parse(response);

        if (parsedResponse) {
          setCategoryList(parsedResponse);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryList();
  }, []);

  const onSubmit = async (values: z.infer<typeof ServiceSchema>) => {
    try {
      await createEngineeringService(values);
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
                <CardTitle>البيانات الأساسية للخدمة</CardTitle>
                <CardDescription>
                  يجب إدخال المعلومات التالية من أجل إنشاء خدمة جديد
                </CardDescription>
              </div>
              <Link
                href={"/admin-dashboard/engineering-services"}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5"
              >
                عودة الى الخدمات
                <Undo2 strokeWidth={1.4} className="mb-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <InputGroup>
                <FormField
                  disabled={isPending}
                  name="serviceIcon"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>أيقونة الخدمة الهندسية</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="serviceIcon"
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
                  name="serviceBanner"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>صورة الخدمة الهندسية</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="serviceBanner"
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
                      <FormLabel>عنوان الخدمة</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان الخدمة" {...field} />
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
                      <FormLabel>عنوان الخدمة باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="عنوان الخدمة باللغة الإنجليزية"
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
                      <FormLabel>وصف الخدمة</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف الخدمة"
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
                      <FormLabel>وصف الخدمة باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف الخدمة باللغة الإنجليزية"
                          {...field}
                          className="h-5 md:h-28"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </InputGroup>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تصنيف الخدمة</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="إختيار تصنيف مناسب للخدمة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryList &&
                          categoryList.map((category, index) => (
                            <SelectItem key={index} value={category?.id}>
                              {category?.title?.ar}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>إعدادات السيو</CardTitle>
              <CardDescription>
                اعدادات خاصة بتحسين محركات البحث الخصة بصفحة الخدمة
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
                      <FormLabel>عنوان صفحة الخدمة</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان صفحة الخدمة" {...field} />
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
                      <FormLabel>عنوان صفحة الخدمة باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="عنوان صفحة الخدمة باللغة الإنجليزية"
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
                      <FormLabel>وصف صفحة الخدمة</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف صفحة الخدمة"
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
                      <FormLabel>وصف صفحة الخدمة باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="وصف صفحة الخدمة باللغة الإنجليزية"
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
              {isPending ? <BtnLoading /> : "إدراج الخدمة"}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default ServiceDetails;
