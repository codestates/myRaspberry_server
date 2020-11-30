import {Request, Response, NextFunction} from 'express'
import 'dotenv/config'

const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.status(200).send('signin')
}

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.status(200).send('signup')
}

const changeinfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.status(200).send('changeinfo')
}

const deleteuser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.status(200).send('deleteuser')
}

export {signin, signup, changeinfo, deleteuser}
