import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProjectImage extends Document {
  _id: Types.ObjectId;
  id: string;
  projectImage: string;
  title: string;
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectImageSchema: Schema = new mongoose.Schema(
  {
    projectImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

projectImageSchema.virtual("id").get(function (this: IProjectImage) {
  return this._id.toHexString();
});

projectImageSchema.set("toJSON", {
  virtuals: true,
});

const ProjectImage =
  mongoose.models.ProjectImage ||
  mongoose.model<IProjectImage>(
    "ProjectImage",
    projectImageSchema,
    "projectImages"
  );

export default ProjectImage;
