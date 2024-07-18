import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEngineeringCategory extends Document {
  _id: Types.ObjectId;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  categoryBanner: string;
  categoryIcon: string;
  services: Types.ObjectId[];
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

const engineeringCategorySchema: Schema = new mongoose.Schema(
  {
    title: {
      ar: { type: String, required: [true], unique: [true] },
      en: { type: String, required: [true], unique: [true] },
    },
    description: {
      ar: { type: String, required: [true] },
      en: { type: String, required: [true] },
    },
    categoryBanner: {
      type: String,
    },
    categoryIcon: {
      type: String,
    },
    services: {
      type: [Schema.Types.ObjectId],
      ref: "EngineeringService",
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

engineeringCategorySchema
  .virtual("id")
  .get(function (this: IEngineeringCategory) {
    return this._id.toHexString();
  });

engineeringCategorySchema.set("toJSON", {
  virtuals: true,
});

const EngineeringCategory =
  mongoose.models.EngineeringCategory ||
  mongoose.model<IEngineeringCategory>(
    "EngineeringCategory",
    engineeringCategorySchema,
    "engineeringCategories"
  );

export default EngineeringCategory;
