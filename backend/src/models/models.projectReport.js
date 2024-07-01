import mongoose, { Schema } from "mongoose";
import { Project } from "./models.project.js";
import { User } from "./user.model.js";

const reportSchema = new Schema(
  {
    project: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const ProjectReport = mongoose.model("ProjectReport", reportSchema);
