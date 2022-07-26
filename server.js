import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import "dotenv/config";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as fs from "fs";

const app = express();
app.use(express.json());

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// IMPORTANT! i don't need them coz i used readdirSync
// import userRoutes from "./routes/user.js";
// app.use("/api", userRoutes);

//routes:
fs.readdirSync("./routes").map(async (r) => {
  let route = await import("./routes/" + r);
  app.use("/", route.default);
});

//database:
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongoDB", err));

// Serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
