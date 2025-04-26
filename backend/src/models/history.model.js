import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileUploadInfo: {
      fileName: { type: String, required: true },
      fileUrl: { type: String }, // If you store the uploaded file somewhere (optional)
      uploadDate: { type: Date, default: Date.now },
    },

    analysisInfo: {
      analysisDate: { type: Date, default: Date.now },
      analysisType: {
        type: String,
        enum: ["2D", "3D"],
        required: true,
      },
      chartType: {
        type: String,
        required: true,
      },
      xAxis: { type: String, required: true },
      yAxis: { type: String, required: true },
      downloadUrl: { type: String }, // Downloadable chart link or Excel result
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
