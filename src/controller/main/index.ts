import {Request, Response, NextFunction} from 'express'
import {hashSync} from 'bcryptjs'
import 'dotenv/config'

const basic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.status(200).send('mainDefault')
}

export {basic}
