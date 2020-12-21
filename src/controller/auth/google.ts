import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import passport from "passport";
import { signResponse } from "../../utils";

export const google = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate("google", {
    scope: "https://www.googleapis.com/auth/plus.login"
  })(req, res, next);
};

export const googleCallBack = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/auth/signin"
    },
    (err: Error, data: object, info: object): Promise<void> => {
      signResponse(req, res, next, err, data, info);
      return;
    }
  )(req, res, next);
};
