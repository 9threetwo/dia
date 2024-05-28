import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    ck: {
      type: String,
      required: true,
      trim: true,
    },
    xe: {
      type: String,
      trim: true,
      default: "-",
    },
    insulin: {
      type: String,
      trim: true,
      default: "-",
    },
    comment: {
      type: String,
      trim: true,
      default: "-",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Data", DataSchema);
