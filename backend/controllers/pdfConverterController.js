const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

exports.convertToPDF = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const inputFilePath = path.resolve(req.file.path); // full path to uploaded file
  let originalName = path.parse(req.file.originalname).name; // original file name without extension
  const outputDir = path.dirname(inputFilePath);
  const libreOfficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`; // adjust if needed

  // Log the original file name (cleaned)
  console.log("Original file name (cleaned):", originalName);

  // Run the LibreOffice command to convert the file
  const command = `${libreOfficePath} --headless --convert-to pdf:writer_pdf_Export "${inputFilePath}" --outdir "${outputDir}"`;

  console.log("Running command:", command);

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error("Error during command execution:", error);
      console.error("stderr:", stderr);
      return res.status(500).send("Error converting file to PDF");
    }

    // Log stdout and stderr for debugging purposes
    console.log("LibreOffice stdout:", stdout);
    console.error("LibreOffice stderr:", stderr);

    // Check if the PDF file exists with a small delay
    try {
      const pdfFilePath = path.join(outputDir, `${originalName}.pdf`);

      // Log the entire content of the directory
      const files = await fsPromises.readdir(outputDir);
      console.log("Files in output directory:", files);

      // Wait a bit before checking for the PDF file to ensure it's fully created
      setTimeout(async () => {
        try {
          const files = await fsPromises.readdir(outputDir);
          console.log("Files in output directory after delay:", files);

          // Check if the PDF exists in the directory
          const foundPDF = files.includes(`${originalName}.pdf`);
          if (foundPDF) {
            console.log(
              "Found PDF:",
              path.join(outputDir, `${originalName}.pdf`)
            );

            // Ensure the file exists before trying to download
            fs.access(
              path.join(outputDir, `${originalName}.pdf`),
              fs.constants.F_OK,
              (err) => {
                if (err) {
                  console.error("File not found:", err);
                  return res
                    .status(404)
                    .send("PDF file not found on the server.");
                }

                // Get the size of the file before streaming it
                const fileSize = fs.statSync(
                  path.join(outputDir, `${originalName}.pdf`)
                ).size;

                // Set the proper headers
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader(
                  "Content-Disposition",
                  `attachment; filename="${path.basename(
                    `${originalName}.pdf`
                  )}"`
                );
                res.setHeader("Content-Length", fileSize); // Set the content length header for the file size

                // Stream the file to the response
                const fileStream = fs.createReadStream(
                  path.join(outputDir, `${originalName}.pdf`)
                );

                fileStream.pipe(res); // Pipe the file stream to the response

                // Handle cleanup after file is successfully streamed
                fileStream.on("end", () => {
                  try {
                    fs.unlinkSync(inputFilePath); // Delete the original uploaded file
                  } catch (e) {
                    console.warn("Error cleaning up files:", e);
                  }
                });

                // Handle errors during streaming
                fileStream.on("error", (err) => {
                  console.error("Error during file streaming:", err);
                  return res.status(500).send("Error streaming the file");
                });
              }
            );
          } else {
            console.error("PDF file not created after conversion.");
            return res.status(500).send("PDF file was not created");
          }
        } catch (err) {
          console.error("Error checking file existence after delay:", err);
          return res.status(500).send("Error checking for the PDF file.");
        }
      }, 2000); // Delay for 2 seconds to ensure LibreOffice has completed the conversion
    } catch (err) {
      console.error("Error checking file existence:", err);
      return res.status(500).send("Error checking for the PDF file.");
    }
  });
};
