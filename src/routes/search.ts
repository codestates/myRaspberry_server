import * as express from "express";
import { searchController } from "../controller";

const router = express.Router();

// GET, /search/:method/
router.get("/:method", searchController.searchMovie);

export default router;
