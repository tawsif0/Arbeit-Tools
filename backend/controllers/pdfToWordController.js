const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const CLOUDMERSIVE_API_KEY = "57407361-38d0-4ef8-a944-9467883e7ab2";

async function convertPdfToDocx(pdfFilePath, outputFilePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(pdfFilePath));

  const response = await axios.post(
    "https://api.cloudmersive.com/convert/pdf/to/docx",
    form,
    {
      headers: {
        ...form.getHeaders(),
        Apikey: CLOUDMERSIVE_API_KEY
      },
      responseType: "arraybuffer"
    }
  );

  fs.writeFileSync(outputFilePath, response.data);
  console.log("DOCX saved to", outputFilePath);
}

function safeUnlink(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  } catch (e) {
    console.error(`Failed to delete file ${filePath}:`, e);
  }
}

exports.convertPdfToWord = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const inputFilePath = path.resolve(req.file.path);
  const outputDir = path.dirname(inputFilePath);
  const originalBaseName = path.parse(req.file.originalname).name;
  const outputFilePath = path.join(outputDir, `${originalBaseName}.docx`);

  try {
    await convertPdfToDocx(inputFilePath, outputFilePath);

    res.download(outputFilePath, `${originalBaseName}.docx`, (err) => {
      if (err) {
        console.error("Error sending DOCX file:", err);
        return res.status(500).send("Error sending file");
      }

      // Clean up uploaded PDF and generated DOCX
      safeUnlink(inputFilePath);
      safeUnlink(outputFilePath);
    });
  } catch (error) {
    console.error("Conversion failed:", error.message || error);
    safeUnlink(inputFilePath);
    return res.status(500).send("Conversion failed");
  }
};
