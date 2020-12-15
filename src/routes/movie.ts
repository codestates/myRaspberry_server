import * as express from "express";
import { isLoggedIn } from "./utils";
import { movieController } from "../controller";

const router = express.Router();

// GET, /movie/updatetag
router.patch("/updatetag", isLoggedIn, movieController.updatetag);
router.get("/:title", movieController.callYoutubeApi);
export default router;
