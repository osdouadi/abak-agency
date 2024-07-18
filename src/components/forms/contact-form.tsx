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
import BtnLoading from "../global/btn-loading";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useToast } from "../ui/use-toast";

import { ContactSchema } from "@/lib/zod-schema/contact-schema";
import { createContact } from "@/queries/contact";

const ContactForm = () => {
  const tFormContent = useTranslations("site.form.formContent.contact");
  const tFormInput = useTranslations("site.form.formInput");
  const tResponses = useTranslations("responses");
  const tCallToAction = useTranslations("callToAction");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ContactSchema>>({
    mode: "onChange",
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      letterTitle: "",
      letterSubject: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof ContactSchema>) => {
    try {
      await createContact(values);
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
        <CardHeader className="text-center md:text-start">
          <CardTitle>{tFormContent("header")}</CardTitle>
          <CardDescription className="text-base md:text-lg">
            {tFormContent("subheader")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="w-full flex items-center flex-col md:flex-row gap-5">
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
                />
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
                />
              </div>
              <div className="w-full flex items-center flex-col md:flex-row gap-5">
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
                />
                <FormField
                  name="letterTitle"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tFormInput("letterTitle")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={tFormInput("letterTitle")}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex items-center flex-col md:flex-row gap-5">
                <FormField
                  name="letterSubject"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{tFormInput("letterSubject")}</FormLabel>
                      <FormControl className="h-[8rem]">
                        <Input
                          placeholder={tFormInput("letterSubject")}
                          className="h-[8rem]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center pt-2.5">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="text-white"
                  size={"lg"}
                >
                  {isPending ? <BtnLoading /> : tCallToAction("sendLetter")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default ContactForm;
