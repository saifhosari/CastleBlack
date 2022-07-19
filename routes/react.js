import express from "express";
import { reactPost, getReacts } from "../controllers/react.js";
import authUser from "../middleWares/auth.js";

const router = express.Router();
router.put("/reactPost", authUser, reactPost);
router.get("/getReacts/:id", authUser, getReacts);
export default router;
