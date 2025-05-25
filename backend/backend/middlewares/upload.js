const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the upload directory
  },
  filename: (req, file, cb) => {
    // Retain the original file name but add a timestamp to avoid name clashes
    const originalName = path.parse(file.originalname).name; // Get the original name without extension
    const extension = path.extname(file.originalname); // Get the file extension
    const newFileName = `${originalName}${extension}`; // Unique name based on original name and timestamp
    cb(null, newFileName); // Set the final file name
  },
});

// File filter for allowed file types (PDF, DOC, DOCX, XLS, XLSX)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-powerpoint", // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(
        "Invalid file type, only PDF, DOC, DOCX, XLS, XLSX files are allowed"
      ),
      false
    ); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload.single("file"); // 'file' is the name field for the uploaded file
