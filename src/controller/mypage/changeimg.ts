import {profile} from 'console'
import {Request, Response, NextFunction} from 'express'
import User from '../../entity/User'
import {deleteImg} from '../../utils/imageDelete'

//NOTE req에 Request를 입력하면 이상하게 req.file.location을 못읽어옵니다...
export default async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const id = res.locals.decodedId
  const {profileImg} = await User.findOne({id})

  if (profileImg !== 'noPath') {
    const imgDelete = deleteImg(profileImg)
    imgDelete ? null : next(imgDelete)
  }

  const infoData = {profileImg: req.file.location}
  let result = await User.changeInfo(id, infoData)

  console.log(result)
  result
    ? res.status(201).send('사진 변경에 성공했습니다.')
    : res.status(401).send('사진 변경에 실패했습니다.')
  return
}
