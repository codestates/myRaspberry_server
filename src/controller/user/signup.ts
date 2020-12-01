import {Request, Response} from 'express'
import 'dotenv/config'
import User from '../../entity/User'

export default async (req: Request, res: Response): Promise<void> => {
  const {email, password}: {email: string; password: string} = req.body

  try {
    const isInvalid = await User.findOne({email})

    console.log(isInvalid)
    if (isInvalid) {
      res
        .status(400)
        .send(
          '이미 존재하는 이메일 주소입니다. 다른 이메일 주소를 사용해주세요.',
        )
    } else {
      const nickname = email.slice(0, 3)

      const register = await User.register(email, password, nickname)

      if (register === undefined) {
        res.status(400).send('회원가입에 실패했습니다.')
      } else {
        res.status(200).send('회원가입이 완료되었습니다.')
      }
    }
  } catch (err) {
    res.status(400).json(err)
  }
}
