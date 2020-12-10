import {LessThan, Like, MoreThan, Not} from 'typeorm'

function getOptions(method: string | ""): object {
    const obj = {
      where: {},
      order: { date: "DESC" },
      take: 25,
    };
    switch (method) {
      case "kor":
        obj.where = { docid: Like("%K%") };
        return obj;
      case "eng":
        obj.where = { docid: Not(Like("%K%")) };
        return obj;
      case "short":
        obj.where = { runtime: LessThan(91) };
        return obj;
      case "long":
        obj.where = { runtime: MoreThan(150) };
        return obj;
      default:
        const newDate = new Date();
        const year = String(newDate.getFullYear());
        // const month = String(newDate.getMonth()+1);
        obj.where = { date: Like(`%${year}%`) };
        return obj;
    }
  }

  export { getOptions };