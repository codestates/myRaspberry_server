import {NextFunction, Request, Response} from 'express'
import bcryptjs from 'bcryptjs'
import 'dotenv/config'
import User from '../../entity/User'

export default async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  if (user) {
    res.status(400).send({message: '이미 존재하는 이메일입니다.'})
  } else {
    const username: string = email.slice(0, 3)
    const passhash: string = bcryptjs.hashSync(password, 12)

    let register: object = await User.register(email, passhash, username)

    if (!register) {
      return res.send(400).send({message: '회원 가입에 실패했습니다.'})
    } else {
      return res.status(201).send('회원가입에 성공했습니다.')
    }
  }
}
