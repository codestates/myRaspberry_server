import {NextFunction, Request, Response} from 'express'
import bcryptjs from 'bcryptjs'
import 'dotenv/config'
import User from '../../entity/User'

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (user) {
    res.status(400).send('이미 존재하는 이메일입니다.')
  } else {
    const username = email.slice(0, 3)
    const passhash = bcryptjs.hashSync(password, 12)

    let register = await User.register(email, passhash, username)

    if (!register) {
      res.send(400).send('회원가입에 실패했습니다.')
    } else {
      res.status(201).send(register)
    }
  }
}
