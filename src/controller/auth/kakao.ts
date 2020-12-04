import {NextFunction, Request, Response} from 'express'
import 'dotenv/config'
import passport from 'passport'
import * as jwt from 'jsonwebtoken'

export const kakao = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  passport.authenticate('kakao')(req, res, next)
}

export const kakaoCallBack = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  passport.authenticate(
    'kakao',
    async (error: any, data: any): Promise<void | Response> => {
      if (error || !data) {
        res.status(400).send('로그인 정보를 다시 확인해주세요')
        return
      }
      req.login(
        data,
        async (error: any): Promise<void | Response> => {
          if (error) {
            return next(error)
          }

          const token = jwt.sign(
            {
              id: data.id,
              username: data.username,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '7d',
            },
          )
          res.cookie('token', token, {
            // httpOnly: true,
            // secure: true,
          })

          res.send('로그인이 완료되었습니다.')
        },
      )
    },
  )(req, res, next)
}
