// server.js or your route file
exports.calculateLove = (req, res) => {
  const { name1, name2, dob1, dob2, isLuckyMatch } = req.body;

  if (!name1 || !name2 || !dob1 || !dob2) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // If this is the lucky 1% match
  if (isLuckyMatch) {
    return res.json({ compatibility: 100 });
  }

  // Calculate name compatibility (30% weight)
  const combinedNames = (name1 + name2).toLowerCase();
  let nameHash = 0;
  for (let i = 0; i < combinedNames.length; i++) {
    nameHash += combinedNames.charCodeAt(i) * (i + 1);
  }
  const nameCompatibility = nameHash % 71; // 0-70

  // Calculate DOB compatibility (70% weight)
  const date1 = new Date(dob1);
  const date2 = new Date(dob2);

  // Simple zodiac sign calculation (just month for simplicity)
  const zodiacSigns = [
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
  ];

  const sign1 = zodiacSigns[date1.getMonth()];
  const sign2 = zodiacSigns[date2.getMonth()];

  // Simple zodiac compatibility (could be enhanced)
  const zodiacCompatibility = Math.abs(date1.getMonth() - date2.getMonth()) * 8;
  const dobCompatibility = 100 - zodiacCompatibility;

  // Combine results (30% name, 70% DOB)
  const compatibility = Math.min(
    99, // Cap at 99% (100% is reserved for lucky matches)
    Math.round(nameCompatibility * 0.3 + dobCompatibility * 0.7)
  );

  res.json({
    compatibility,
    zodiacSign1: sign1,
    zodiacSign2: sign2,
  });
};
