import mongoose, { Document, Schema, Types } from "mongoose";

export interface IImage extends Document {
  _id: Types.ObjectId;
  galleryImage: string;
  title: {
    ar: string;
    en: string;
  };
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema: Schema = new mongoose.Schema(
  {
    galleryImage: {
      type: String,
      required: true,
    },
    title: {
      ar: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

imageSchema.virtual("id").get(function (this: IImage) {
  return this._id.toHexString();
});

imageSchema.set("toJSON", {
  virtuals: true,
});

const Image =
  mongoose.models.Image ||
  mongoose.model<IImage>("Image", imageSchema, "images");

export default Image;
