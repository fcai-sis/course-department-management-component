import mongoose, { InferSchemaType } from "mongoose";

const prerequisiteSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  prerequisiteCode: {
    type: String,
    required: true,
  },
});

const prerequisiteModelName = "Prerequisite";

export type PrerequisiteType = InferSchemaType<typeof prerequisiteSchema>;

const PrerequisiteModel = mongoose.model(prerequisiteModelName, prerequisiteSchema);

export default PrerequisiteModel;
