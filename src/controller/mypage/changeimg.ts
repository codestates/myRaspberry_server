import { Request, Response, NextFunction } from "express";
import User from "../../entity/User";
import { deleteImg } from "../../utils/index";

// NOTE req에 Request를 입력하면 이상하게 req.file.location을 못읽어옵니다...
export default async (req, res: Response, next: NextFunction): Promise<void> => {
  const id = res.locals.decodedId;
  await User.findOne({ id })
    .then((user) => {
      user.profileImg === "noPath" ? null : deleteImg(user.profileImg);
    })
    .catch((err) => next(err));

  const infoData = { profileImg: req.file.location };

  await User.changeInfo(id, infoData)
    .then(() => {
      res.status(200).send("사진 변경에 성공했습니다.");
      return;
    })
    .catch((err) => {
      res.status(400).send({ message: "사진 변경에 실패했습니다." });
      return;
    });
};
