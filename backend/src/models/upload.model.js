import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: {type: String},
  fileSize: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
  data: [{}],
});

const Upload = mongoose.model("Upload", UploadSchema);
export default Upload;
