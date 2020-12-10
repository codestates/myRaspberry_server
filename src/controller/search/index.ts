import {Request, Response} from 'express'
import {LessThan, Like, MoreThan} from 'typeorm'
import {User, Handlemovie} from '../../entity'
import {convertJsonToData, getOptions, sortMovie} from '../../utils'

const searchMovie = async (req: Request, res: Response): Promise<void> => {
  const {method} = req.params
  const options = getOptions(method);
  const id = res.locals.decodedId;
  const user = await User.findOne({id})
  const dbMovies = await Handlemovie.find(options);
  const movies: any = dbMovies.map(el => convertJsonToData(el));
  const results = sortMovie(user, movies);
  
  if (results) {
    res.status(200).send(results);
  } else {
    res.status(200).send('nothing found')
  }
}

export {searchMovie}
