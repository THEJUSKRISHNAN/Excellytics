import Upload from "../models/upload.model.js";
import XLSX from "xlsx";
import User from "../models/user.model.js";

export const uploadFile = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const saved = await Upload.create({
      userId: req.user.id,
      filename: req.file.originalname,
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
    );
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
