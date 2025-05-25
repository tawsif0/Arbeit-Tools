exports.encode = (req, res) => {
  const { input } = req.body;

  if (typeof input !== "string" || !input.length) {
    return res.status(400).json({ error: "Input must be a non-empty string" });
  }

  try {
    const encoded = Buffer.from(input, "utf-8").toString("base64");
    res.json({ encoded });
  } catch {
    res.status(500).json({ error: "Encoding failed" });
  }
};

exports.decode = (req, res) => {
  let { input } = req.body;

  if (typeof input !== "string" || !input.trim()) {
    return res
      .status(400)
      .json({ error: "Input must be a non-empty base64 string" });
  }

  try {
    // Clean input from any whitespace/newlines
    input = input.replace(/\s+/g, "");

    // Validate Base64 format strictly
    if (
      !/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
        input
      )
    ) {
      return res.status(400).json({ error: "Invalid Base64 format" });
    }

    // Decode Base64 to buffer
    const decodedBuffer = Buffer.from(input, "base64");

    // Convert buffer to UTF-8 string
    const decodedText = decodedBuffer.toString("utf-8");

    // Optional: check for replacement character � meaning invalid UTF-8 decoding
    if (decodedText.includes("\ufffd")) {
      return res
        .status(400)
        .json({ error: "Decoded data contains invalid UTF-8 characters" });
    }

    return res.json({ decoded: decodedText });
  } catch (err) {
    return res.status(400).json({ error: "Error decoding Base64 input" });
  }
};
