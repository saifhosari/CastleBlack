import express from "express";
import { uploadImages, listImages } from "../controllers/upload.js";
import authUser from "../middleWares/auth.js";
import imageUpload from "../middleWares/imageUpload.js";

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);
router.post("/listImages", authUser, listImages);

export default router;
