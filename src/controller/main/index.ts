import {Request, Response, NextFunction} from 'express'

const basic = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.status(200).send('mainDefault')
}

export {basic}

//메인 페이지// 로그인이 필수인가? No //로그인시 반영되는 내용이 있는가? YES

/*
(로그인이 되었는가?) => NO => 디폴트 영화 목록을 보여준다.
                => YES => (like,unlike가 있는가?) => NO => 디폴트 영화 목록을 보여준다
                                              


따봉을 누른다 => (로그인이 되었는가?)=>YES => 토큰으로 유저를 찾아 like 컬럼에 해당 영화 id를 추가


//안따봉을 누른다 => (로그인이 되었는가?)=> YES => 토큰으로 유절르 찾아 unLike 컬럼에 해당 영화 id를 추가



*/
