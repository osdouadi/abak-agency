import SectionHeader from "@/components/global/section-header";
import SectionSubheader from "@/components/global/section-subheader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {ChevronsLeft, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogsSection = () => {
  return (
    <section className="min-h-screen px-4 md:px-10 md:mt-10 pt-10">
      <div className="text-center md:max-w-[40%] mx-auto">
        <SectionHeader>اباك مسيرة حافلة بالإنجازات</SectionHeader>
        <SectionSubheader>
          تصفح آخر مشاريع مكتب اباك للإستشارات الهندسية, تاريخنا حافل بالإنجازات
          و بكل فخر تحصلنا على ثقة العديد من العملاء في المملكة العربية
          السعودية.
        </SectionSubheader>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-4">
        <Card className="w-full h-[26rem] text-center overflow-hidden">
          <CardHeader>
            <CardTitle className="mb-1">الإشراف على مشروع سلامة</CardTitle>
            <CardDescription className="w-full line-clamp-4">
              قام فريق اباك بمتابعة الأشغال على موقع سلامة في الرياض حيث تم بناء
              العديد من الاعمدة كما تم تفحص معاير السلامة في المشروع قام فريق
              اباك بمتابعة الأشغال على موقع سلامة في الرياض حيث تم بناء العديد
              من الاعمدة كما تم تفحص معاير السلامة في المشروع
            </CardDescription>
            <div className="flex justify-center items-center gap-3">
              <Link
                href={"#"}
                className="bg-primary text-sm h-[40px] px-2.5 rounded-md flex justify-center items-center gap-1"
              >
                <span>قراءة المزيد</span>
                <ChevronsLeft strokeWidth={1.5} className="w-4 h-4" />
              </Link>
              <Link
                href={"#"}
                className="bg-primary/15 outline-primary/60 text-sm h-[40px] px-2.5 rounded-md flex justify-center items-center gap-2"
              >
                مشاركة 
                <Share2 strokeWidth={1.5} className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <div className="w-full h-[80vw] md:h-[17vw] relative flex justify-center">
            <Image
              src={"/assets/img4.jpg"}
              alt="test"
              width={700}
              height={700}
              quality={100}
            />
          </div>
        </Card>
     
      </div>
    </section>
  );
};

export default BlogsSection;
