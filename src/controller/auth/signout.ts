import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie("token");
  req.logout();
  res.redirect("/");
//  res.status(200).send("you are log out now");
  return;
};
