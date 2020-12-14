import { Request, Response } from "express";
import { LessThan, Like, MoreThan } from "typeorm";
import { User, Handlemovie, Tag } from "../../entity";
import { convertJsonToData, getOptions, sortMovie } from "../../utils";

export default async (req: Request, res: Response): Promise<void> => {
  const id = res.locals.decodedId;
  const { method } = req.params;
  let options;
  let result;
  let tagInfo;

  if (Number(method)) {
    const tagOptions = [`[${method},%`, `%,${method},%`, `%,${method}]`];
    options = getOptions("tag", 0, ...tagOptions);

    const tags = await User.findOne({ id }).then((user) => JSON.parse(user.tag));
    tagInfo = await Tag.findOne({ id: Number(method) });

    const dbMovies = await Handlemovie.find(options).then((data) =>
      data.map((el) => convertJsonToData(el))
    );

    result = sortMovie(tags, dbMovies);
  } else if (method === "title") {
    const { name } = req.query;
    const tagOptions = `%${name}%`;
    options = getOptions(method, 0, tagOptions);

    const tags = await User.findOne({ id }).then((user) => JSON.parse(user.tag));

    const dbMovies = await Handlemovie.find(options).then((data) =>
      data.map((el) => convertJsonToData(el))
    );

    result = sortMovie(tags, dbMovies);
  } else if (method === "new" || "kor" || "eng" || "short" || "long") {
    await User.findOne({ id })
      .then((data) => JSON.parse(data.searchCount))
      .then((data) => {
        data[`${method}`] = data[`${method}`] + 1;
        return data;
      })
      .then((searchCount) => {
        const data = { searchCount: JSON.stringify(searchCount) };
        return User.changeInfo(id, data);
      });

    const { tags, count } = await User.findOne({ id }).then((user) => {
      const returnData = { tags: JSON.parse(user.tag), count: JSON.parse(user.searchCount) };
      return returnData;
    });
    options = getOptions(method, count[`${method}`]);

    const dbMovies = await Handlemovie.find(options).then((data) =>
      data.map((el) => convertJsonToData(el))
    );
    result = sortMovie(tags, dbMovies);
  }

  if (result.length) {
    tagInfo ? res.status(200).send({ tagInfo, result }) : res.status(200).send(result);
    return;
  }
  res.status(200).send("해당 영화를 찾지 못했습니다.");
  return;
};
