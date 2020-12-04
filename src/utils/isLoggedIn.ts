import {Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token
      const secret = process.env.JWT_SECRET
      const decoded = jwt.verify(token, secret, (err, verifiedJwt) => {
        if (err) {
          console.log('err here')
          res.send(err.message)
        } else {
          return verifiedJwt
        }
      })

      res.locals.decoded = decoded

      next()
    } else {
      res.status(403).send('로그인을 진행해주세요')
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json('다시 로그인 해주세요.')
      return
    }
  }
}
