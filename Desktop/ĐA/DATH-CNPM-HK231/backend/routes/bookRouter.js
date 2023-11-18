import { Router } from "express";
import { createBook, getAllBook } from "../controllers/bookController.js";

const router = Router();
router.route("/").get(getAllBook).post(createBook);

export const bookRouter = router;
