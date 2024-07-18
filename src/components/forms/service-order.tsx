"use client";

import React from "react";

import { AlertDialog } from "../ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import BtnLoading from "../global/btn-loading";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { ServiceOrderSchema } from "@/lib/zod-schema/service-order-schema";
import { createServiceOrder } from "@/queries/service-order";
import { useParams } from "next/navigation";

const ServiceOrder = () => {
  const tFormContent = useTranslations("site.form.formContent.serviceOrder");
  const tFormInput = useTranslations("site.form.formInput");
  const tResponses = useTranslations("responses");
  const { toast } = useToast();
  const {serviceId} = useParams()

  const form = useForm<z.infer<typeof ServiceOrderSchema>>({
    mode: "onChange",
    resolver: zodResolver(ServiceOrderSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      city: "",
      address: "",
      serviceId: serviceId.toString(),
      additionalNotes: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof ServiceOrderSchema>) => {
    try {
      await createServiceOrder(values);
      toast({
        title: tResponses("orderSent"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: tResponses("sendingOrderFailed"),
        description: tResponses("pleaseTryAgain"),
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>{tFormContent("header")}</CardTitle>
          <CardDescription className="text-base md:text-lg">
            {tFormContent("subheader")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="w-full flex flex-col md:flex-row items-center gap-5">
                <FormField
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tFormInput("fullName")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tFormInput("fullName")}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tFormInput("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder={tFormInput("email")} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tFormInput("phoneNumber")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tFormInput("phoneNumber")}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-5">
                <FormField
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tFormInput("city")}</FormLabel>
                      <FormControl>
                        <Input placeholder={tFormInput("city")} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> {tFormInput("address")}</FormLabel>
                      <FormControl>
                        <Input placeholder={tFormInput("address")} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tFormInput("additionalNotes")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tFormInput("additionalNotes")}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="w-full flex flex-col md:flex-row items-center gap-5"></div>
              <div className="flex justify-center md:pt-2.5">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="text-white"
                  size={"lg"}
                >
                  {isPending ? <BtnLoading /> : "إرسال الطلب"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default ServiceOrder;
