const multer = require("multer");
const path = require("path");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for saving files
    const dest = path.resolve(__dirname, "../../public/temp");
    console.log("Saving file to:", dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + path.extname(file.originalname);
    console.log("Saving file as:", filename);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only jpeg, jpg, and png file types
  const fileTypes = /jpeg|jpg|png/;
  const isValid =
    fileTypes.test(path.extname(file.originalname).toLowerCase()) &&
    fileTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png files are allowed!"), false);
  }
};

// Multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max file size
  fileFilter: fileFilter,
});

module.exports = { upload };
