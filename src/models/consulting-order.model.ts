import mongoose, { Document, Schema, Types } from "mongoose";

export interface IConsultingOrder extends Document {
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
    fullName: String,
    email: String,
    phoneNumber: String,
    city: String,
    address: String,
    date: String,
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
    "consultingOrders"
  );

export default ConsultingOrder;
