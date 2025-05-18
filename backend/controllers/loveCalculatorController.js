exports.calculateLove = (req, res) => {
  const { name1, name2 } = req.body;

  if (!name1 || !name2) {
    return res.status(400).json({ error: "Both names are required" });
  }

  const combinedNames = (name1 + name2).toLowerCase();

  // Simple hash function to generate a pseudo-random score based on names
  let hash = 0;
  for (let i = 0; i < combinedNames.length; i++) {
    hash += combinedNames.charCodeAt(i) * (i + 1);
  }

  const compatibility = hash % 101; // 0 to 100%

  res.json({ compatibility });
};
