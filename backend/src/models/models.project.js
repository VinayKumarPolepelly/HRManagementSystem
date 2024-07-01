import mongoose, { mongo, Schema } from "mongoose";
import { User } from "./user.model.js";
const projectSchema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  developingPlatform: {
    type: String,
    required: true,
  },
  databaseTechnology: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectManager: {
    type: String,
    required: true,
  },
});

export const Project = mongoose.model("Project", projectSchema);
