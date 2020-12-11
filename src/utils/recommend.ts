interface MOVIE {
  id: number
  docid: string
  title: string
  titleEng: string
  director: string
  actor: string[]
  plotKr: string
  plotEng: string
  runtime: number
  genre: string
  image: {
    posters: string
    stlls: string
  }
  tag: number[]
  date: string
  score: number
}

const getScore = (isLike: any | null, movie: number[]): number => {
  if (Object.keys(isLike).length > 0 && movie) {
    // console.log("isLike: ", isLike);
    // console.log("movie: ", movie);
    const userFav: number[] = Object.keys(isLike).map(x => Number(x));
    const isUserLike: number[] = userFav.filter(x=>movie.includes(x));
    return isUserLike.reduce((a, c) => isLike[c] ? a+isLike[c] : a, 0) * 10;
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
  return 0
}

const sortMovie = (tags: any | null, movies: any[] | []): object[] => {
  if (tags && movies) {
    for ( let key in tags ) {
      const newTags = {};
      for ( let tag in tags[key] ) {
        newTags[tag] = Number(tags[key][tag]);
      }
      tags[key] = newTags;
    }
    for ( let movie of movies ) {
      movie['tag'] = JSON.parse(movie['tag']);
    }

    const listOfMovie: MOVIE[] = [];
    movies.forEach((movie: MOVIE, index: number) => {
      movie.score = 1000;
      listOfMovie.push(movie);
      listOfMovie[index].score += getScore(tags.like, (listOfMovie[index].tag));
      listOfMovie[index].score -= getScore(tags.disLike, (listOfMovie[index].tag));
    })
    return listOfMovie.sort((a: MOVIE, b: MOVIE) => b.score - a.score);
  }
  return movies
}

export {sortMovie}
