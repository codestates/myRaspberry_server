import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  err: Error,
  user: any,
  info?: object
): Promise<void> => {
  if (err || info) {
    if (err) {
      next(err);
    } else {
      res.status(400).send(info);
      return;
    }
  }
  req.login(user, { session: false }, (err) => {
    err ? next(err) : null;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.cookie("token", token, {
      // httpOnly: true,
      // secure: true,
    });

    const { username, profileImg, tag, selectMovie } = user;

//    res.status(200).send({
//      username,
//      profileImg,
//      tag: JSON.parse(tag),
//      selectMovie: JSON.parse(selectMovie)
//    });
    res.redirect("/");
    return;
  });
};
