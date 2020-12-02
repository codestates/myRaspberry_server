import {Request, Response} from 'express'
import 'dotenv/config'
import User from '../../entity/User'

export default async (req: Request, res: Response): Promise<void> => {
  res.status(200).send('this is signIn')
}
