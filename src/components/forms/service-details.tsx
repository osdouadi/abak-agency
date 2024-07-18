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
import FileUpload from "../global/file-upload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Undo2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getEnginneringCategoryList } from "@/queries/engineering-category";
import { createEngineeringService } from "@/queries/engineering-service";
import { ServiceSchema } from "@/lib/zod-schema/service-schema";
import { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";

const ServiceDetails = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const tDashboardEngineeringService = useTranslations(
    "dashboard.engineeringService"
  );
  const tResponse = useTranslations("responses");
  const tCallToAction = useTranslations("callToAction");

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
      await createEngineeringService(values);
      toast({
        title: tResponse("engineeringServiceAddedSuccessfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToAddEngineeringService"),
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
                  {tDashboardEngineeringService("detailsTitle")}
                </CardTitle>
                <CardDescription>
                  {tDashboardEngineeringService("detailsDescription")}
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
                        {tDashboardEngineeringService("serviceIcon")}
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
                        {tDashboardEngineeringService("serviceBanner")}
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
                        {tDashboardEngineeringService("titleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService("titleAR")}
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
                        {tDashboardEngineeringService("titleEN")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService("titleEN")}
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
                        {tDashboardEngineeringService("descriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
                            "descriptionAR"
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
                        {tDashboardEngineeringService("descriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
                            "descriptionEN"
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
                        "engineeringServiceCategory"
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
                              "engineeringServiceCategoryPlaceholder"
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
                {tDashboardEngineeringService("SEOSettings")}
              </CardTitle>
              <CardDescription>
                {tDashboardEngineeringService("SEOSettingsDescription")}
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
                        {tDashboardEngineeringService("pageTitleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService(
                            "pageTitleAR"
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
                        {tDashboardEngineeringService("pageTitleEN")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringService(
                            "pageTitleEN"
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
                  name="SEOSettings.pageDescription.ar"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardEngineeringService("pageDescriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
                            "pageDescriptionAR"
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
                  name="SEOSettings.pageDescription.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardEngineeringService("pageDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringService(
                            "pageDescriptionEN"
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
              {isPending ? <BtnLoading /> : tCallToAction("addService")}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default ServiceDetails;
