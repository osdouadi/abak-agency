import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEngineeringService extends Document {
  _id: Types.ObjectId;
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  serviceBanner: string;
  serviceIcon: string;
  category: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const engineeringServiceSchema: Schema = new mongoose.Schema(
  {
    title: {
      ar: { type: String, required: [true], unique: [true] },
      en: { type: String, required: [true], unique: [true] },
    },
    description: {
      ar: { type: String, required: [true] },
      en: { type: String, required: [true] },
    },
    serviceBanner: {
      type: String,
    },
    serviceIcon: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "EngineeringCategory",
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

engineeringServiceSchema
  .virtual("id")
  .get(function (this: IEngineeringService) {
    return this._id.toHexString();
  });

engineeringServiceSchema.set("toJSON", {
  virtuals: true,
});

const EngineeringService =
  mongoose.models.EngineeringService ||
  mongoose.model<IEngineeringService>(
    "EngineeringService",
    engineeringServiceSchema,
    "engineeringServices"
  );

export default EngineeringService;
