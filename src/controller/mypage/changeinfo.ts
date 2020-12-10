import {Request, Response, NextFunction} from 'express'
import User from '../../entity/User'
import {compareSync} from 'bcryptjs'
import bcryptjs from 'bcryptjs'

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let {password, newUserName, newPass} = req.body

  const id = res.locals.decodedId
  const user = await User.findOne({id})

  if (compareSync(password, user.password)) {
    newPass
      ? (password = bcryptjs.hashSync(newPass, 12))
      : (password = user.password)

    let username = user.username
    newUserName ? (username = newUserName) : null

    const infoData = {username, password}
    let result = await User.changeInfo(id, infoData)

    result
      ? res.status(201).send('회원정보 변경에 성공했습니다.')
      : res.status(401).send('회원정보 변경에 실패했습니다.')
    return
  } else {
    res.status(401).send('입력하신 비밀번호가 일치하지 않습니다.')
    return
  }
}

//인트로 페이지 : 로그인 필수인가 => NO // 로그인시 반영되는것이 있는가? => NO

//예상라우터 //GET/intro/:movieid
//1. 영화를 선택해 영화 id를 보낸다.
//2. (한정된) Movie 테이블에서 id로 영화를 검색한다.
//3. Tags 컬럼을 기반으로 DB에서 같은 TAGS를 가진 영화를 거른다
