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
  FormDescription,
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
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import BtnLoading from "../global/btn-loading";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { Switch } from "../ui/switch";
import { ImageSchema } from "@/lib/zod-schema/image";
import { getImageById, updateImage } from "@/queries/gallery";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";
import { ImageData } from "@/types/image-data";

const ImageUpdate = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const { id } = useExtractIdFromPath();
  const { toast } = useToast();

  useEffect(() => {
    const fetchImageData = async (id: string) => {
      try {
        const response = await getImageById(id);

        setImageData(response);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "فشل الحصول على الخدمة",
          description: "الرجاء المحاولة مرة اخرى!",
        });
      }
    };

    fetchImageData(id ?? "");
  }, [id, toast]);

  const form = useForm<z.infer<typeof ImageSchema>>({
    mode: "onChange",
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      galleryImage: "",
      title: {
        ar: "",
        en: "",
      },
      isDisabled: false,
    },
  });

  useEffect(() => {
    if (imageData) {
      form.reset({
        title: {
          ar: imageData?.title.ar || "",
          en: imageData?.title.en || "",
        },
        galleryImage: imageData?.galleryImage || "",
        isDisabled: imageData?.isDisabled || false,
      });
    }
  }, [imageData, form]);

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof ImageSchema>) => {
    try {
      await updateImage(id ?? "", values);
      toast({
        title: "تعديل الصورة بنجاح",
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
                <CardTitle>البيانات الأساسية للمشروع</CardTitle>
                <CardDescription>
                  يجب إدخال المعلومات التالية من أجل إنشاء مشروع جديد
                </CardDescription>
              </div>
              <Link
                href={"/admin-dashboard/gallery"}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5"
              >
                عودة الى المشاريع
                <Undo2 strokeWidth={1.4} className="mb-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <FormField
                    disabled={isPending}
                    name="galleryImage"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>صورة المشروع </FormLabel>
                        <FormControl>
                          <FileUpload
                            apiEndpoint="galleryImage"
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-8">
                  <FormField
                    disabled={isPending}
                    control={form.control}
                    name="title.ar"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>عنوان المشروع</FormLabel>
                        <FormControl>
                          <Input placeholder="عنوان المشروع" {...field} />
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
                      <FormItem className="w-full">
                        <FormLabel>عنوان المشروع</FormLabel>
                        <FormControl>
                          <Input placeholder="عنوان المشروع" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormField
                      control={form.control}
                      name="isDisabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              إخفاء صورة المشروع
                            </FormLabel>
                            <FormDescription>
                              عدم إظهار صورة المشروع في الصفحة الرئيسية
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              dir="ltr"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="text-white"
                    size={"lg"}
                  >
                    {isPending ? <BtnLoading /> : "إدراج المشروع"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default ImageUpdate;
