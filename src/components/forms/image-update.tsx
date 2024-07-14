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
import { ProjectImageSchema } from "@/lib/zod-schema/project-image";
import {
  getProjectImageById,
  updateProjectImage,
} from "@/queries/project-image";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";
import { ProjectImageData } from "@/types/project-image-data";

const ImageUpdate = () => {
  const [projectImageData, setProjectImageData] = useState<ProjectImageData | null>(
    null
  );
  const { id } = useExtractIdFromPath();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjectImageData = async (id: string) => {
      try {
        const response = await getProjectImageById(id);
        const parsedResponse = JSON.parse(response);

        setProjectImageData(parsedResponse);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "فشل الحصول على الخدمة",
          description: "الرجاء المحاولة مرة اخرى!",
        });
      }
    };

    fetchProjectImageData(id ?? "");
  }, [id, toast]);

  const form = useForm<z.infer<typeof ProjectImageSchema>>({
    mode: "onChange",
    resolver: zodResolver(ProjectImageSchema),
    defaultValues: {
      projectImage: "",
      title: "",
      isDisabled: false,
    },
  });

  useEffect(() => {
    if (projectImageData) {
      form.reset({
        title: projectImageData?.title || "",
        projectImage: projectImageData?.projectImage || "",
        isDisabled: projectImageData?.isDisabled || false,
      });
    }
  }, [projectImageData, form]);

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof ProjectImageSchema>) => {
    try {
      await updateProjectImage(id ?? "", values);
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
                    name="projectImage"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>صورة المشروع </FormLabel>
                        <FormControl>
                          <FileUpload
                            apiEndpoint="projectImage"
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
                    name="title"
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
