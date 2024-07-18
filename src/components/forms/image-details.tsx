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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FileUpload from "../global/file-upload";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import BtnLoading from "../global/btn-loading";
import { Undo2 } from "lucide-react";
import { Switch } from "../ui/switch";


import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../ui/use-toast";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";


import { ImageSchema } from "@/lib/zod-schema/image";
import { createImage } from "@/queries/gallery";
import { constants } from "@/config/constants";

const ImageDetails = () => {
    const tDashboardGallery = useTranslations("dashboard.gallery");
    const tResponse = useTranslations("responses");
    const tCallToAction = useTranslations("callToAction");
  const { toast } = useToast();

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

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof ImageSchema>) => {
    try {
      await createImage(values);
      toast({
        title: tResponse("ImageAddedSuccessfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToAddImage"),
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
                <CardTitle>{tDashboardGallery("imageMainDetails")}</CardTitle>
                <CardDescription>
                  {tDashboardGallery("imageDetailsDescription")}
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
                          {tDashboardGallery("addProjectImage")}
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
                        <FormLabel>{tDashboardGallery("titleAR")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={tDashboardGallery("titleAR")}
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
                        <FormLabel>{tDashboardGallery("titleEN")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={tDashboardGallery("titleEN")}
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
                    {isPending ? <BtnLoading /> : tCallToAction("addImage")}
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

export default ImageDetails;
