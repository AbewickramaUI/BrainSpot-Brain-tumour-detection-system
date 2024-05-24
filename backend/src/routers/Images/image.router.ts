import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
//import { Multer } from 'multer';
import multer from "multer";

const router = Router();
const prisma = new PrismaClient();
//const multer = new Multer() ;

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  const uploadedFile = req.file;
  const { username } = req.body;

  if (!uploadedFile) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const createdImage = await prisma.images.create({
      data: {
        filename: uploadedFile.filename,
        username: username,
      },
    });

    return res.json({
      message: "File uploaded successfully.",
      image: createdImage,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
