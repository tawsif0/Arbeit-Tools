exports.countWordsCharactersSentencesLines = (req, res) => {
  const { text } = req.body;

  if (typeof text !== "string") {
    return res.status(400).json({ message: "Text must be a string" });
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  // Improved sentence count to handle sentences without punctuation at the end
  const sentenceCount = text.trim()
    ? (text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || []).length
    : 0;

  // Split by all common newline types for cross-platform support
  const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;

  res.json({
    words: wordCount,
    characters: charCount,
    sentences: sentenceCount,
    lines: lines,
  });
};
