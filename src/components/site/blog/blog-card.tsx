import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronsLeft, Share2 } from "lucide-react";
import { constants } from "@/config/constants";

const BlogCard = ({ title, shortDescription, id, blogImage }) => {
  return (
    <Card className="w-full h-[22rem] md:h-[28rem] text-center overflow-hidden">
      <div className="w-full h-[11rem] md:h-[14rem] relative flex justify-center">
        <Image
          src={blogImage}
          alt="test"
          width={700}
          height={700}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[11rem] md:h-[14rem] py-4 px-2 flex flex-col justify-between">
        <div>
          <CardTitle className="mb-2 font-medium">{title}</CardTitle>
          <CardDescription className="w-full line-clamp-4">
            {shortDescription}
          </CardDescription>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Link
            href={`${constants.links.siteBlogs}${id}`}
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
            <Share2 strokeWidth={1.4} className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
