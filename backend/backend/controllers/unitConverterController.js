exports.convertUnits = (req, res) => {
  const { input, fromUnit, toUnit } = req.body;

  // Conversion rates to meters
  const toMeters = {
    meter: 1,
    kilometer: 1000,
    mile: 1609.34,
    cm: 0.01,
    ft: 0.3048,
    inch: 0.0254,
  };

  if (!(fromUnit in toMeters) || !(toUnit in toMeters)) {
    return res.status(400).json({ message: "Invalid conversion units" });
  }

  // Convert input to meters
  const valueInMeters = input * toMeters[fromUnit];

  // Convert meters to target unit
  const result = valueInMeters / toMeters[toUnit];

  res.json({ result });
};
