import { Request, Response } from "express";
import { LessThan, Like, MoreThan } from "typeorm";
import { User, Handlemovie } from "../../entity";
import { convertJsonToData, getOptions, sortMovie } from "../../utils";

export default async (req: Request, res: Response): Promise<void> => {
  const { method } = req.params;

  let options;
  if (Number(method)) {
    const tagOptions = [`[${method},%`, `%,${method},%`, `%,${method}]`];
    options = getOptions("tag", ...tagOptions);
  } else {
    options = getOptions(method);
  }

  const id = res.locals.decodedId;
  const tags = await User.findOne({ id }).then((user) => JSON.parse(user.tag));

  const dbMovies = await Handlemovie.find(options).then((data) =>
    data.map((el) => convertJsonToData(el))
  );
  const results = sortMovie(tags, dbMovies);

  if (results.length) {
    res.status(200).send(results);
    return;
  }
  res.status(200).send("해당 영화를 찾지 못했습니다.");
  return;
};
