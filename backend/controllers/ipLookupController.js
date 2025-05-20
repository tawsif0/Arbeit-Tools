const axios = require("axios");

const API_KEY = "789a49bd0599ff"; // Replace with your IPinfo API key

exports.lookupIP = async (req, res) => {
  const { ip } = req.body;
  try {
    // Fetch data from IPinfo API
    const response = await axios.get(
      `https://ipinfo.io/${ip}/json?token=${API_KEY}`
    );

    // Check if the IP is private (bogon) and handle accordingly
    if (response.data.bogon) {
      return res.json({
        message:
          "This is a private IP address (bogon) and does not have detailed public data.",
      });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "IP Lookup failed", error: error.message });
  }
};
