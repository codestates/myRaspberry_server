import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import passport from "passport";
import { signResponse } from "../../utils";

export const kakao = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate("kakao")(req, res, next);
};

export const kakaoCallBack = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate(
    "kakao",
    (err: Error, data: object, info: object): Promise<void> => {
      signResponse(req, res, next, err, data, info);
      return;
    }
  )(req, res, next);
};
