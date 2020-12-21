import { NextFunction, Request, Response } from "express";
import { User } from "../../entity";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = res.locals.decodedId;

  const result = await User.findOne({ id });

  const { username, profileImg, tag, selectMovie } = result;

  if (result) {
    res.status(200).send({
      username,
      profileImg,
      tag: JSON.parse(tag),
      selectMovie: JSON.parse(selectMovie)
    });
    return;
  }
  res.status(400).send({ message: "유저를 찾을 수 없습니다." });

  return;
};
