import { Request, Response, NextFunction } from "express";
import User from "../../entity/User";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = res.locals.decodedId;
  const { tag, selectMovie } = req.body;

  const data = { tag: JSON.stringify(tag), selectMovie: JSON.stringify(selectMovie) };

  await User.changeInfo(id, data)
    .then(() => res.status(200).send("ok"))
    .catch((err) => next(err));
};
