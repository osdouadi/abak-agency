import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBlog extends Document {
  _id: Types.ObjectId;
  id: string;
  title: {
    ar: string;
    en: string;
  };
  shortDescription: {
    ar: string;
    en: string;
  };
  richDescription: {
    ar: string;
    en: string;
  };
  SEOSettings: {
    pageTitle: {
      ar: string;
      en: string;
    };
    pageDescription: {
      ar: string;
      en: string;
    };
  };
  blogImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema: Schema = new mongoose.Schema(
  {
    title: {
      ar: { type: String, required: [true], unique: [true] },
      en: { type: String, required: [true], unique: [true] },
    },
    shortDescription: {
      ar: { type: String, required: [true] },
      en: { type: String, required: [true] },
    },
    longDescription: {
      ar: { type: String, required: [true] },
      en: { type: String, required: [true] },
    },
    blogImage: {
      type: String,
    },
    SEOSettings: {
      pageTitle: {
        ar: { type: String, required: [true] },
        en: { type: String, required: [true] },
      },
      pageDescription: {
        ar: { type: String, required: [true] },
        en: { type: String, required: [true] },
      },
    },
  },
  { timestamps: true }
);

blogSchema
  .virtual("id")
  .get(function (this: IBlog) {
    return this._id.toHexString();
  });

blogSchema.set("toJSON", {
  virtuals: true,
});

const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema, "blogs");

export default Blog;
