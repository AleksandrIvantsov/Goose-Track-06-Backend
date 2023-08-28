const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    file.originalname = req.user._id;

    return {
      folder: "avatars",
      allowed_formats: ["jpg", "png"], // Adjust the allowed formats as needed
      public_id: file.originalname, // Use original filename as the public ID
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
