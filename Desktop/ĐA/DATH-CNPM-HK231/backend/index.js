import express from "express";
import { json } from "express";
import { PORT } from "./env.js";
import cors from "cors";

import jwt from "jsonwebtoken";
import { bookRouter } from "./routes/bookRouter.js";



import multer from "multer";
import fs from "fs";
import path from "path";
const app = express();


app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(json());
app.use(cors());


const uploadDir = "./public/uploads";


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${extension}`;
    cb(null, fileName);
  },
});


const upload = multer({ storage: storage });

app.use(upload.single("image"));


app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`App is running in PORT ${PORT}`);
});
