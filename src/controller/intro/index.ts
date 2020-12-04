import {Request, Response, NextFunction} from 'express'

const basic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log(res.locals.decoded)
  res.status(200).send('introDefault')
}
export {basic}

//인트로 페이지 : 로그인 필수인가 => NO // 로그인시 반영되는것이 있는가? => NO

//예상라우터 //GET/intro/:movieid
//1. 영화를 선택해 영화 id를 보낸다.
//2. (한정된) Movie 테이블에서 id로 영화를 검색한다.
//3. Tags 컬럼을 기반으로 DB에서 같은 TAGS를 가진 영화를 거른다
