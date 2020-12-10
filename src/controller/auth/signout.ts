import {NextFunction, Request, Response} from 'express'
export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.clearCookie('token')
  req.logout()
  // req.session.destroy(err => console.log(err))
  res.status(302).redirect('/')
}
