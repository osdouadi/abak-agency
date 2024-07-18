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
import { Undo2 } from "lucide-react";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../ui/use-toast";
import { useTranslations } from "next-intl";


import { CategorySchema } from "@/lib/zod-schema/category-schema";
import { createEngineeringCategory } from "@/queries/engineering-category";
import { constants } from "@/config/constants";

const CategoryDetails = () => {
  const tDashboardEngineeringCategory = useTranslations(
    "dashboard.engineeringCategory"
  );
  const tResponse = useTranslations("responses");
  const tCallToAction = useTranslations("callToAction")
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
        title: tResponse("engineeringCategoryAddedSuccessfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToEngineeringCategory"),
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
                  {tDashboardEngineeringCategory("detailsTitle")}
                </CardTitle>
                <CardDescription>
                  {tDashboardEngineeringCategory("detailsDescription")}
                </CardDescription>
              </div>
              <Link
                href={constants.links.adminEngineeringCategories}
                className="bg-transparent hover:bg-primary transform transition-all text-primary font-medium hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded flex items-center gap-1.5"
              >
                {tCallToAction("backToEngineeringCategories")}
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
                      <FormLabel>
                        {tDashboardEngineeringCategory("categoryIcon")}
                      </FormLabel>
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
                      <FormLabel>
                        {tDashboardEngineeringCategory("categoryBanner")}
                      </FormLabel>
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
                      <FormLabel>
                        {tDashboardEngineeringCategory("titleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory("titleAR")}
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
                        {tDashboardEngineeringCategory("titleEN")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory("titleEN")}
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
                        {tDashboardEngineeringCategory("descriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
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
                        {tDashboardEngineeringCategory("descriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                {tDashboardEngineeringCategory("SEOSettings")}
              </CardTitle>
              <CardDescription>
                {tDashboardEngineeringCategory("SEOSettingsDescription")}
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
                        {tDashboardEngineeringCategory("pageTitleAR")}{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory(
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
                        {tDashboardEngineeringCategory("pageTitleEN")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory(
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
                        {tDashboardEngineeringCategory("pageDescriptionAR")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
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
                        {tDashboardEngineeringCategory("pageDescriptionEN")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
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
              {isPending ? (
                <BtnLoading />
              ) : (
                tCallToAction("addEngineeringCategory")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AlertDialog>
  );
};

export default CategoryDetails;
