import {NextFunction, Request, Response} from 'express'
export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.clearCookie('token')
  req.logout()
  res.status(302).redirect('/')
  return
}
