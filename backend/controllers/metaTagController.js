// controllers/metaTagController.js
exports.generateMetaTags = (req, res) => {
  const { title, description, keywords } = req.body;

  const metaTags = `
        <meta name="title" content="${title}">
        <meta name="description" content="${description}">
        <meta name="keywords" content="${keywords}">
    `;

  res.json({ metaTags });
};
