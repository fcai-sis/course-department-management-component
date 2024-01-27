import mongoose, { InferSchemaType } from "mongoose";

const courseSchema = new mongoose.Schema({
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
    // TODO: ref to department
    type: String,
    required: true,
  },
  creditHours: {
    type: Number,
    required: true,
  },
});

const courseModelName = "Course";

export type CourseType = InferSchemaType<typeof courseSchema>;

const CourseModel = mongoose.model<CourseType>(courseModelName, courseSchema);

export default CourseModel;
