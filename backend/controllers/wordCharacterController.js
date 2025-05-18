// controllers/wordCharacterController.js
exports.countWordsAndCharacters = (req, res) => {
  const { text } = req.body;
  const wordCount = text.trim().split(/\s+/).length;
  const charCount = text.length;

  res.json({
    words: wordCount,
    characters: charCount
  });
};
