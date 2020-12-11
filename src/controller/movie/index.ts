import {Request, Response, NextFunction} from 'express'
import User from '../../entity/User'

const updatetag = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const id = res.locals.decodedId
  const data = {tag: JSON.stringify(req.body)}
  await User.changeInfo(id, data)
    .then(() => res.status(200).send('ok'))
    .catch(err => next(err))
}

export {updatetag}
