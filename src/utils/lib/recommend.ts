import { MOVIE } from "../../definitions";

const getScore = (isLike: any | null, movie: number[]): number => {
  // NOTE - 빈 객체가 들어오면 TypeError: Cannot convert undefined or null to object 가 떠서 다음과 같이 처리해주었습니다.
  const likeData: object = typeof isLike === "undefined" ? { 0: 0 } : isLike;
  const keys = Object.keys(likeData);
  if (keys.length > 0 && movie.length > 0) {
    const userFav: number[] = keys.map((x) => Number(x));
    const isUserLike: number[] = userFav.filter((x) => movie.includes(x));
    return isUserLike.reduce((a, c) => (likeData[c] ? a + likeData[c] : a), 0);
  }
  return 0;
};

const sortMovie = (tags: any | null, movies: any[] | []) => {
  if (tags && movies.length > 0) {
    const listOfMovie: MOVIE[] = [];

    movies.forEach((movie: MOVIE, index: number) => {
      listOfMovie.push(movie);
      listOfMovie[index].score = 1000;
      listOfMovie[index].score += getScore(tags.like, listOfMovie[index].tag);
      listOfMovie[index].score -= getScore(tags.disLike, listOfMovie[index].tag);
    });
    return listOfMovie.sort((a: MOVIE, b: MOVIE) => b.score - a.score);
  }
  return movies;
};

export { sortMovie };
