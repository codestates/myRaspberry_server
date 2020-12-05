import {NextFunction, Request, Response} from 'express'
import 'dotenv/config'
import passport from 'passport'
import {signResponse} from '../../utils'

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  passport.authenticate(
    'local',
    (err: Error, data: object, info: object): Promise<void> =>
      signResponse(req, res, next, err, data, info),
  )(req, res, next)
}
