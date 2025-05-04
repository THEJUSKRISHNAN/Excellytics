import Upload from "../models/upload.model.js";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";

export const uploadFile = async (req, res) => {
  try {
    const fileSize = req.file.size;
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const saved = await Upload.create({
      userId: req.user.id,
      filename: req.file.originalname,
      fileSize: fileSize,
      data: sheetData,
    });

    res.json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const history = async (req, res) => {
  try {
    const uploads = await Upload.find(
      { userId: req.user.id },
      "filename uploadedAt"
    ).sort({ uploadedAt: -1 }); // Sort by newest first

    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { uploadId } = req.body;
    const upload = await Upload.findById(uploadId);
    if (!upload || upload.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const ws = XLSX.utils.json_to_sheet(upload.data || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${upload.filename || "data.xlsx"}"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const uploads = await Upload.find({ userId });
    const totalUploads = uploads.length;

    // latst uploaded file
    const recentUpload = uploads[uploads.length - 1]?.filename || "N/A";

    // Calculate storage used
    let totalBytes = 0;
    uploads.forEach((upload) => {
      totalBytes += upload.fileSize || 0;
    });

    const storageUsed = `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
    
    //  ai
    const Insight =totalUploads > 0 ? `You've uploaded ${totalUploads} files. Keep analyzing to discover trends.`: "Upload your first file to get smart insights.";
        
    // chart
    const uploadsDate = await Upload.find({ userId }).sort({ uploadedAt: 1 });
    const dataByDate = {};

    uploadsDate.forEach(upload => {
      const date = new Date(upload.uploadedAt);
      const localDate = date.toLocaleDateString('en-CA'); // "YYYY-MM-DD"
      dataByDate[localDate] = (dataByDate[localDate] || 0) + 1;
    });
    
    return res.json({
      stats: {
        totalUploads,
        recentUpload,
        storageUsed,
      },
      Insight,
      dataByDate
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
