import * as express from "express";
import { movieController } from "../controller";

const router = express.Router();

// GET, /movie/updatetag
router.patch("/updatetag", movieController.updatetag);
router.get("/:title", movieController.callYoutubeApi);
export default router;
