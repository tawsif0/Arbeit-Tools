const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

exports.convertToPDF = (req, res) => {
  const inputFilePath = path.resolve(req.file.path); // full path to uploaded file
  const originalName = path.parse(req.file.originalname).name; // original file name without extension
  const outputDir = path.dirname(inputFilePath);

  const libreOfficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`; // adjust if needed

  const command = `${libreOfficePath} --headless --convert-to pdf:writer_pdf_Export "${inputFilePath}" --outdir "${outputDir}"`;

  console.log("Running command:", command);

  exec(command, (error, stdout, stderr) => {
    console.log("LibreOffice stdout:", stdout);
    console.error("LibreOffice stderr:", stderr);

    if (error) {
      console.error("LibreOffice conversion error:", error);
      try {
        fs.unlinkSync(inputFilePath);
      } catch {}
      return res.status(500).send("Error converting file to PDF");
    }

    const pdfPath = path.join(outputDir, `${originalName}.pdf`);

    if (!fs.existsSync(pdfPath)) {
      console.error("PDF file does not exist after conversion.");
      try {
        fs.unlinkSync(inputFilePath);
      } catch {}
      return res.status(500).send("PDF file was not created");
    }

    res.download(pdfPath, path.basename(pdfPath), (err) => {
      try {
        fs.unlinkSync(inputFilePath);
      } catch (e) {
        console.warn(e.message);
      }
      try {
        if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
      } catch (e) {
        console.warn(e.message);
      }

      if (err) console.error("Error sending file:", err);
    });
  });
};
