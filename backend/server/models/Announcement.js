import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    description: {
      type: String,
      required: [true, "Content is required."],
    },
  },
  { timeseries: true }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
