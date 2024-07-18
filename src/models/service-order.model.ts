import mongoose, { Document, Schema, Types } from "mongoose";

export interface IServiceOrder extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  serviceId: Types.ObjectId;
  additionalNote: string;
}

const serviceOrderSchema: Schema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phoneNumber: String,
    city: String,
    address: String,
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "EngineeringService",
    },
    additionalNote: String,
  },
  { timestamps: true }
);

serviceOrderSchema.virtual("id").get(function (this: IServiceOrder) {
  return this._id.toHexString();
});

serviceOrderSchema.set("toJSON", {
  virtuals: true,
});

const ServiceOrder =
  mongoose.models.ServiceOrder ||
  mongoose.model<IServiceOrder>(
    "ServiceOrder",
    serviceOrderSchema,
    "serviceOrders"
  );

export default ServiceOrder;
