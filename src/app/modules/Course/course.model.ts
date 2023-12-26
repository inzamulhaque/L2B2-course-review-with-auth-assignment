import { Schema, model } from "mongoose";
import { ICourse, IDetails, ITags } from "./course.interface";

const courseTagsSchema = new Schema<ITags>(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const courseDetailsSchema = new Schema<IDetails>(
  {
    level: {
      type: String,
      enum: {
        values: ["Beginner", "Intermediate", "Advanced"],
        message: "{VALUE} is not a valid level",
      },
      required: [true, "Course level is required"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
  },
  { _id: false },
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Course title is required"],
    },
    instructor: {
      type: String,
      required: [true, "Course instructor is required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, "Category ID is required"],
      ref: "Category",
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
    },
    tags: [
      {
        type: courseTagsSchema,
        required: [true, "Course tag is required"],
      },
    ],
    startDate: {
      type: String,
      required: [true, "Course start date is required"],
    },
    endDate: {
      type: String,
      required: [true, "Course end date is required"],
    },
    language: {
      type: String,
      required: [true, "Course language is required"],
    },
    provider: {
      type: String,
      required: [true, "Course provider is required"],
    },
    durationInWeeks: {
      type: Number,
      required: [true, "Course duration in weeks is required"],
    },
    details: {
      type: courseDetailsSchema,
      required: [true, "Course details in weeks is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Course = model("Course", courseSchema);

export default Course;
