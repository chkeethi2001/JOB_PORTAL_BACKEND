
import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // recruiter or applicant
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ChatMessage", chatMessageSchema);
