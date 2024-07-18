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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Undo2 } from "lucide-react";
import { Switch } from "../ui/switch";
import FileUpload from "../global/file-upload";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import BtnLoading from "../global/btn-loading";

import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ImageSchema } from "@/lib/zod-schema/image";
import { getImageById, updateImage } from "@/queries/gallery";
import { ImageData } from "@/types/image-data";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";

const ImageUpdate = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const tDashboardGallery = useTranslations("dashboard.gallery")
  const tResponse = useTranslations("responses")
  const tCallToAction = useTranslations("callToAction");
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
          title: tResponse("failedToGetImageDetails"),
          description: tResponse("pleaseTryAgain"),
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
        title: tResponse("imageEditedSuccessfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToEditImage"),
        description: tResponse("pleaseTryAgain"),
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
                <CardTitle>
                  {tDashboardGallery("editingImageMainDetails")}
                </CardTitle>
                <CardDescription>
                  {tDashboardGallery("editingImageDetailsDescription")}
                </CardDescription>
              </div>
              <Link
                href={constants.links.adminGallery}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5"
              >
                {tCallToAction("backToImages")}
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
                        <FormLabel>
                          {tDashboardGallery("changeImage")}
                        </FormLabel>
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
                        <FormLabel>
                          {tDashboardGallery("editingImageTitleAR")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={tDashboardGallery(
                              "editingImageTitleAR"
                            )}
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
                      <FormItem className="w-full">
                        <FormLabel>
                          {tDashboardGallery("editingImageTitleEN")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={tDashboardGallery(
                              "editingImageTitleEN"
                            )}
                            {...field}
                          />
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
                              {tDashboardGallery("hideProjectImage")}
                            </FormLabel>
                            <FormDescription>
                              {tDashboardGallery("hideProjectImageDescription")}
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
                    {isPending ? <BtnLoading /> : tCallToAction("saveEdits")}
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
