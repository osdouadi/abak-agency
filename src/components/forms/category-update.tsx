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
import {
  getEngineeringCategoryById,
  updateEngineeringCategory,
} from "@/queries/engineering-category";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import InputGroup from "../global/input-group";
import BtnLoading from "../global/btn-loading";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { CategorySchema } from "@/lib/zod-schema/category-schema";
import { CategoryData } from "@/types/category-data";
import { useExtractIdFromPath } from "@/hooks/useExtractIdFromPath";
import { useTranslations } from "next-intl";
import { constants } from "@/config/constants";

const CategoryUpdate = () => {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const { id } = useExtractIdFromPath();

  const tDashboardEngineeringCategory = useTranslations(
    "dashboard.engineeringCategory"
  );
  const tResponse = useTranslations("responses");
  const tCallToAction = useTranslations("callToAction");
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategoryData = async (id: string) => {
      try {
        const response = await getEngineeringCategoryById(id);
        const parsedResponse = JSON.parse(response);
        setCategoryData(parsedResponse);
      } catch (error) {
        toast({
          variant: "destructive",
          title: tResponse("failedToGetEngineeringCategoryDetails"),
          description: tResponse("pleaseTryAgain"),
        });
      }
    };

    fetchCategoryData(id ?? "");
  }, [id, toast]);

  const form = useForm<z.infer<typeof CategorySchema>>({
    mode: "onChange",
    resolver: zodResolver(CategorySchema),
  });

  useEffect(() => {
    if (categoryData) {
      form.reset({
        title: {
          ar: categoryData?.title?.ar || "",
          en: categoryData?.title?.en || "",
        },
        description: {
          ar: categoryData?.description?.ar || "",
          en: categoryData?.description?.en || "",
        },
        SEOSettings: {
          pageTitle: {
            ar: categoryData?.SEOSettings?.pageTitle.ar || "",
            en: categoryData?.SEOSettings?.pageTitle.en || "",
          },
          pageDescription: {
            ar: categoryData?.SEOSettings?.pageDescription.ar || "",
            en: categoryData?.SEOSettings?.pageDescription.en || "",
          },
        },
        categoryIcon: categoryData?.categoryIcon || "",
        categoryBanner: categoryData?.categoryBanner || "",
      });
    }
  }, [categoryData, form]);

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    try {
      await updateEngineeringCategory(id ?? "", values);
      toast({
        title: tResponse("engineeringCategoryEditedSuccessfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponse("failedToEditEngineeringCategory"),
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
                  {tDashboardEngineeringCategory(
                    "editingEngineeringCategoryMainDetails"
                  )}
                </CardTitle>
                <CardDescription>
                  {tDashboardEngineeringCategory(
                    "editingEngineeringCategoryMainDetailsDescription"
                  )}
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
                        {tDashboardEngineeringCategory(
                          "editingEngineeringCategoryIcon"
                        )}
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
                        {tDashboardEngineeringCategory(
                          "editingEngineeringCategoryBanner"
                        )}
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
                        {tDashboardEngineeringCategory(
                          "editingEngineeringCategoryTitleAR"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory(
                            "editingEngineeringCategoryTitleAR"
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
                        {tDashboardEngineeringCategory(
                          "editingEngineeringCategoryTitleEN"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory(
                            "editingEngineeringCategoryTitleEN"
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
                        {tDashboardEngineeringCategory(
                          "editingEngineeringCategoryDescriptionAR"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
                            "editingEngineeringCategoryDescriptionAR"
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
                        {tDashboardEngineeringCategory(
                          "editingEngineeringCategoryDescriptionEN"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
                            "editingEngineeringCategoryDescriptionEN"
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
                {tDashboardEngineeringCategory("editingSEOSettings")}
              </CardTitle>
              <CardDescription>
                {tDashboardEngineeringCategory("editingSEOSettingsDescription")}
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
                      <FormLabel>
                        {tDashboardEngineeringCategory("editingPageTitleAR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory(
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
                  name="SEOSettings.pageDescription.en"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>
                        {tDashboardEngineeringCategory("editingPageTitleEN")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tDashboardEngineeringCategory(
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
                        {tDashboardEngineeringCategory(
                          "editingPageDescriptionAR"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
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
                        {tDashboardEngineeringCategory(
                          "editingPageDescriptionEN"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={tDashboardEngineeringCategory(
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

export default CategoryUpdate;
