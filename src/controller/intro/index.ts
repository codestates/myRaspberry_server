import {Request, Response, NextFunction} from 'express'

const basic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.status(200).send('introDefault')
}

export {basic}
