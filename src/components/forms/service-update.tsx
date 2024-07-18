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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";

import FileUpload from "../global/file-upload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Undo2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getEngineeringServiceById,
  updateEngineeringService,
} from "@/queries/engineering-service";

import { getEnginneringCategoryList } from "@/queries/engineering-category";
import { Category } from "@/types/category";
import { ServiceSchema } from "@/lib/zod-schema/service-schema";
import { ServiceData } from "@/types/service-data";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";

const ServiceUpdate = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);

  const tDashboardEngineeringService = useTranslations(
    "dashboard.engineeringService"
  );
  const tResponse = useTranslations("responses");
  const tCallToAction = useTranslations("callToAction");
  const { id } = useExtractIdFromPath();
  const { toast } = useToast();

  useEffect(() => {
    const fetchServiceData = async (id: string) => {
      try {
        const response = await getEngineeringServiceById(id);

        setServiceData(response);
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
        if (response) {
          setCategoryList(response);
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
                <CardTitle>
                  {tDashboardEngineeringService(
                    "editingEngineeringServiceMainDetails"
                  )}
                </CardTitle>
                <CardDescription>
                  {tDashboardEngineeringService(
                    "editingEngineeringServiceMainDetailsDescription"
                  )}
                </CardDescription>
              </div>
              <Link
                href={constants.links.adminEngineeringServices}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5"
              >
                {tCallToAction("backToEngineeringServices")}
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
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingEngineeringServiceIcon"
                        )}
                      </FormLabel>
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
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingEngineeringServiceBanner"
                        )}
                      </FormLabel>
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
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingEngineeringServiceTitleAR"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService(
                            "editingEngineeringServiceTitleAR"
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
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingEngineeringServiceTitleEN"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService(
                            "editingEngineeringServiceTitleEN"
                          )}
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
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingEngineeringServiceDescriptionAR"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
                            "editingEngineeringServiceDescriptionAR"
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
                  name="description.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingEngineeringServiceDescriptionEN"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
                            "editingEngineeringServiceDescriptionEN"
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tDashboardEngineeringService(
                        "editingEngineeringServiceCategory"
                      )}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={tDashboardEngineeringService(
                              "editingEngineeringServiceCategory"
                            )}
                          />
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
              <CardTitle>
                {tDashboardEngineeringService("editingSEOSettings")}
              </CardTitle>
              <CardDescription>
                {tDashboardEngineeringService("editingSEOSettingsDescription")}
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
                        {tDashboardEngineeringService("editingPageTitleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService(
                            "editingPageTitleAR"
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
                  name="SEOSettings.pageTitle.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardEngineeringService("editingPageTitleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService(
                            "editingPageTitleEN"
                          )}
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
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingPageDescriptionAR"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
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
                  name="description.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardEngineeringService(
                          "editingPageDescriptionEN"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
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

export default ServiceUpdate;
