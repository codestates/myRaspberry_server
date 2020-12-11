import {Request, Response, NextFunction} from 'express'
import User from '../../entity/User'
import {compareSync} from 'bcryptjs'
import bcryptjs from 'bcryptjs'

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let {password, newUserName, newPass} = req.body

  const id = res.locals.decodedId
  const user = await User.findOne({id})

  if (compareSync(password, user.password)) {
    newPass
      ? (password = bcryptjs.hashSync(newPass, 12))
      : (password = user.password)

    let username = user.username
    newUserName ? (username = newUserName) : null

    const infoData = {username, password}
    let result = await User.changeInfo(id, infoData)

    result
      ? res.status(200).send('회원정보 변경에 성공했습니다.')
      : res.status(400).send({message: '회원정보 변경에 실패했습니다.'})
    return
  } else {
    res.status(400).send({message: '입력하신 비밀번호가 일치하지 않습니다.'})
    return
  }
}
