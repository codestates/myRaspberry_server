import {Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token
      const secret = process.env.JWT_SECRET
      const id = jwt.verify(token, secret, (err, verifiedJwt) => {
        if (err) {
          console.log('err here')
          res.send(err.message)
        } else {
          return verifiedJwt.id
        }
      })

      res.locals.decodedId = id
      next()
    } else {
      res.status(403).send({message: '먼저 로그인을 진행해주세요'})
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res
        .status(401)
        .send({message: '토큰이 만료되었습니다. 다시 로그인을 진행해주세요'})
      return
    } else {
      next(err)
    }
  }
}
