import { MOVIE } from "../../definitions";

const getScore = (isLike: any | null, movie: number[]): number => {
  // NOTE - 빈 객체가 들어오면 TypeError: Cannot convert undefined or null to object 가 떠서 다음과 같이 처리해주었습니다.
  let likeData: object = {};
  if (typeof isLike === "undefined") {
    likeData = { 0: 1 };
  } else {
    likeData = isLike;
  }

  if (Object.keys(likeData).length > 0 && movie) {
    // console.log("isLike: ", isLike);
    // console.log("movie: ", movie);

    const userFav: number[] = Object.keys(likeData).map((x) => Number(x));
    const isUserLike: number[] = userFav.filter((x) => movie.includes(x));

    return isUserLike.reduce((a, c) => (likeData[c] ? a + likeData[c] : a), 0) * 10;
    // const matrix: number[][] = new Array(isUserLike.length);
    // let index: number = -1;
    // for (let x = 0; x < isUserLike.length; x++) {
    //   matrix[x] = new Array(movie.length).fill(0);
    // }
    // for (let y = 0; y < movie.length; y++) {
    //   index = userFav.indexOf(movie[y]);
    //   if (index !== -1) {
    //     console.log("matrix[index][y], isLike[movie[y]: ", matrix[index][y], isLike[movie[y]]);
    //     matrix[index][y] = isLike[movie[y]];
    //   }
    // }
    // const sum = matrix.reduce((a, c) => a + c.reduce((aa, cc) => aa + cc, 0), 0)
    // return sum * 5
  }
  return 0;
};

const sortMovie = (tags: any | null, movies: any[] | []) => {
  if (tags && movies) {
    for (const key in tags) {
      const newTags = {};
      for (const tag in tags[key]) {
        newTags[tag] = Number(tags[key][tag]);
      }
      tags[key] = newTags;
    }

    // NOTE - 영화들은 convert to json 유틸로 parse 되어 들어옵니다.
    // for (let movie of movies) {
    //   movie['tag'] = JSON.parse(movie['tag'])
    // }

    const listOfMovie: MOVIE[] = [];
    movies.forEach((movie: MOVIE, index: number) => {
      movie.score = 1000;
      listOfMovie.push(movie);
      listOfMovie[index].score += getScore(tags.like, listOfMovie[index].tag);
      listOfMovie[index].score -= getScore(tags.disLike, listOfMovie[index].tag);
    });

    return listOfMovie.sort((a: MOVIE, b: MOVIE) => b.score - a.score);
  }
  return movies;
};

export { sortMovie };
