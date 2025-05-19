// controllers/wordCharacterController.js
exports.countWordsCharactersSentencesLines = (req, res) => {
  const { text } = req.body;

  if (typeof text !== "string") {
    return res.status(400).json({ message: "Text must be a string" });
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const sentenceCount = text.trim()
    ? (text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || []).length
    : 0;

  const lines = text.trim() === ""
    ? 0
    : text.trim().split(/\n\s*\n+/).length;

  res.json({
    words: wordCount,
    characters: charCount,
    sentences: sentenceCount,
    lines: lines,
  });
};
