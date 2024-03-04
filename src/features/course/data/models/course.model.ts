import mongoose, { InferSchemaType } from "mongoose";

import { departmentModelName } from "@fcai-sis/shared-models";

export const courseModelName = "Course";
const courseSchema = new mongoose.Schema({
  // TODO: figure out the code patterns, what each part of the code means
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  description: {
    ar: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: departmentModelName,
    required: true,
  },
  creditHours: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
  },
  prerequisites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: courseModelName,
    },
  ],
});

export type CourseType = InferSchemaType<typeof courseSchema>;

const CourseModel = mongoose.model<CourseType>(courseModelName, courseSchema);

export default CourseModel;
