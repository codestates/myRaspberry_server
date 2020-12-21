import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import fetch from "node-fetch";
import User from "../../entity/User";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { title } = req.params;
    const url: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YOUTUBE_API_KEY}&maxResults=4&type=video&videoEmbeddable=true&q=영화+${title}`;
    const data: any = await fetch(encodeURI(url))
      .then((json) => json.json())
      .catch((err) => next(err));
    res.status(200).send(JSON.stringify(data));
    return;
  } catch (err) {
    next(err);
    return;
  }
};
