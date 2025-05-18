// controllers/ipLookupController.js
const axios = require("axios");

exports.lookupIP = async (req, res) => {
  const { ip } = req.body;
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "IP Lookup failed" });
  }
};
