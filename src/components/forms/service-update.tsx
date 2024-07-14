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
import {
  getEngineeringServiceById,
  updateEngineeringService,
} from "@/queries/engineering-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getEnginneringCategoryList } from "@/queries/engineering-category";
import { Category } from "@/types/category";
import { ServiceSchema } from "@/lib/zod-schema/service-schema";
import { ServiceData } from "@/types/service-data";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";

const ServiceUpdate = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const { id } = useExtractIdFromPath();
  const { toast } = useToast();

  useEffect(() => {
    const fetchServiceData = async (id: string) => {
      try {
        const response = await getEngineeringServiceById(id);
        const parsedResponse = JSON.parse(response);

        setServiceData(parsedResponse);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "فشل الحصول على الخدمة",
          description: "الرجاء المحاولة مرة اخرى!",
        });
      }
    };

    fetchServiceData(id ?? "");
  }, [id, toast]);

  const form = useForm<z.infer<typeof ServiceSchema>>({
    mode: "onChange",
    resolver: zodResolver(ServiceSchema),
  });
  
  useEffect(() => {
    if (serviceData) {
      form.reset({
        title: {
          ar: serviceData?.title?.ar || "",
          en: serviceData?.title?.en || "",
        },
        description: {
          ar: serviceData?.description?.ar || "",
          en: serviceData?.description?.en || "",
        },
        category: serviceData?.category,
        SEOSettings: {
          pageTitle: {
            ar: serviceData?.SEOSettings?.pageTitle.ar || "",
            en: serviceData?.SEOSettings?.pageTitle.en || "",
          },
          pageDescription: {
            ar: serviceData?.SEOSettings?.pageDescription.ar || "",
            en: serviceData?.SEOSettings?.pageDescription.en || "",
          },
        },
        serviceIcon: serviceData?.serviceIcon || "",
        serviceBanner: serviceData?.serviceBanner || "",
      });
    }
  }, [serviceData, form]);

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
      await updateEngineeringService(id ?? "", values);
      toast({
        title: "تعديل التصنيف بنجاح",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل تعديل التصنيف",
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
                  يجب إدخال المعلومات التالية من أجل إنشاء خدمة جديدة
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
                      <FormLabel>أيقونة الخدمة الهندسي</FormLabel>
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
                      <FormLabel>صورة التصنيف الهندسي</FormLabel>
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
                          <SelectValue placeholder="تعديل تصنيف الخدمة" />
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
                      <FormLabel>عنوان صفحة الحدمة</FormLabel>
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
              {isPending ? <BtnLoading /> : "حفظ التعديلات"}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default ServiceUpdate;
