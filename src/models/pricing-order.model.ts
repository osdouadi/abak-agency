import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPricingOrder extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const consultingOrderSchema: Schema = new mongoose.Schema(
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

consultingOrderSchema.virtual("id").get(function (this: IConsultingOrder) {
  return this._id.toHexString();
});

consultingOrderSchema.set("toJSON", {
  virtuals: true,
});

const ConsultingOrder =
  mongoose.models.ConsultingOrder ||
  mongoose.model<IConsultingOrder>(
    "ConsultingOrder",
    consultingOrderSchema,
    "ConsultingOrders"
  );

export default ConsultingOrder;
