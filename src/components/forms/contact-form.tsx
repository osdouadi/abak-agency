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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "إسم المستخدم يجب أن لا يقل عن حرفين." }),
  userEmail: z.string().min(1, { message: "يجب إدخال بريد إلكتروني صالح." }),
  phoneNumber: z.string().min(1, { message: "يجب إدخال بريد إلكتروني صالح." }),
  city: z.string().min(1, { message: "يجب إدخال المدينة." }),
  address: z.string().min(1, { message: "يجب إدخال العنوان." }),
  date: z
    .string()
    .min(1, { message: "يجب إدخال الموعد المناسب للإجتماع مع مستشار." }),
  addtionalNote: z
    .string()
    .min(1, { message: "الملاحضات الإضافية لا تقل عن حرف واحد" }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
  });
  return (
    <AlertDialog>
      <Card className="w-full md:w-[70%] pb-8 mx-auto z-10 mb-10">
        <CardHeader className="text-center">
          <CardTitle className="mb-4">معلومات الإستشارة</CardTitle>
          <CardDescription className="text-lg">
            نحن أقرب مما تتخيل. عندك مستشار مخصص لخدمتك شخصيًا. حنّا في أباك
            نقدم لك خدمة غير مسبوقة في الاستشارات الهندسية. كلم مستشارك عن كل
            طموحاتك لتحقيق حلم مشروعك. لا تتردد، نحن جزء من تحقيق رؤيتك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <div className="w-full flex items-center flex-col md:flex-row gap-5">
                <FormField
                  name="الإسم الكامل"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>الإسم الكامل</FormLabel>
                      <FormControl>
                        <Input readOnly placeholder="الإسم الكامل" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="البريد الإلكتروني"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          placeholder="البريد الإلكتروني"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="w-full flex items-center flex-col md:flex-row gap-5">
                <FormField
                  name="الإسم الكامل"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input readOnly placeholder="رقم الهاتف" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="الإسم الكامل"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>عنوان الرسالة</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          placeholder="عنوان الرسالة"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="w-full flex items-center flex-col md:flex-row gap-5">
                <FormField
                  name=""
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> موضوع الرسالة</FormLabel>
                      <FormControl className="h-[8rem]">
                        <Input
                          readOnly
                          placeholder="موضوع الرسالة"
                          className="h-[8rem]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="flex justify-center mt-5">
                <Button className="text-white">إرسال</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default ContactForm;
