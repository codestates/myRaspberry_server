import { Request, Response, NextFunction } from "express";
import User from "../../entity/User";
import fetch from "node-fetch";
require('dotenv').config();

const updatetag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = res.locals.decodedId;
  const data = { tag: JSON.stringify(req.body) };
  await User.changeInfo(id, data)
    .then(() => res.status(200).send("ok"))
    .catch((err) => next(err));
};

const callYoutubeApi = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title } = req.params;
    const url: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YOUTUBE_API_KEY}&maxResults=3&type=video&videoEmbeddable=true&q=영화+${title}`;
    const data: any = await fetch(encodeURI(url)).then(json=>json.json()).catch(err=>console.log(err));
    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export { updatetag, callYoutubeApi };
