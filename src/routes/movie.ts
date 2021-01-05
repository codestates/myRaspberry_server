import * as express from "express";
import { movieController } from "../controller";

const router = express.Router();

// PATCH, /movie/selectmovie
router.patch("/selectmovie/", isLoggedIn, movieController.selectmovie);
// GET, /movie/selectmovie
router.get("/:title", movieController.callYoutubeApi);
export default router;
