// controllers/unitConverterController.js
exports.convertUnits = (req, res) => {
  const { input, fromUnit, toUnit } = req.body;
  const conversionRates = {
    meter: { kilometer: 0.001, mile: 0.000621371 },
    kilometer: { meter: 1000, mile: 0.621371 },
    mile: { meter: 1609.34, kilometer: 1.60934 }
  };

  if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
    const result = input * conversionRates[fromUnit][toUnit];
    res.json({ result });
  } else {
    res.status(400).json({ message: "Invalid conversion units" });
  }
};
