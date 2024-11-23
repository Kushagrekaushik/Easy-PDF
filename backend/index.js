const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const os = require("os");
const mammoth = require("mammoth");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

// CORS Configuration
app.use(
  cors({
    origin: ["https://easy-pdf-app.vercel.app"], // Replace withgit  your frontend URL
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Health Check
app.get("/", (req, res) => {
  res.json("Server is running!");
});

// Multer Configuration for File Uploads (Temporary Directory)
const uploadDir = os.tmpdir(); // System's temporary directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Convert DOCX to HTML using Mammoth
const convertDocxToHtml = (docxPath) => {
  return new Promise((resolve, reject) => {
    mammoth
      .convertToHtml({ path: docxPath })
      .then((result) => resolve(result.value))
      .catch((err) => reject(err));
  });
};

// Convert HTML to PDF using Puppeteer
const convertHtmlToPdf = async (htmlContent, pdfPath) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome-stable", // Vercel-specific path
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "load" });
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();
};

// File Conversion Endpoint
app.post("/convertFile", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const originalName = path.parse(req.file.originalname).name;
    const htmlContent = await convertDocxToHtml(req.file.path);
    const pdfPath = path.join(uploadDir, `${originalName}.pdf`);
    await convertHtmlToPdf(htmlContent, pdfPath);

    res.json({
      message: "File converted successfully",
      filename: `${originalName}.pdf`,
      downloadLink: `/files/${originalName}.pdf`,
    });
  } catch (err) {
    console.error("Conversion Error:", err);
    res.status(500).json({ message: "Conversion failed", error: err.toString() });
  }
});

// Serve Converted Files
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(os.tmpdir(), req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }
  res.download(filePath, (err) => {
    if (err) {
      console.error(`Error while sending file: ${err}`);
    }
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: err.message });
});

// Start Server Locally
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Required for Vercel deployment
