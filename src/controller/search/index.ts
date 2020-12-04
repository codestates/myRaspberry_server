// import {Request, Response} from 'express'
// import {Like} from 'typeorm'
// // import {Movie} from '../../entity'

// const searchMovie = async (req: Request, res: Response): Promise<void> => {
//   const {method, value} = req.params
//   const searchValue = `%${value}%`

//   let results
//   if (method === 'title') {
//     results = await Movie.find({
//       where: [{title: Like(searchValue)}],
//     })
//   } else if (method === 'actor') {
//     results = await Movie.find({
//       where: [{actor: Like(searchValue)}],
//     })
//   } else if (method === 'genre') {
//     results = await Movie.find({
//       where: [{genre: Like(searchValue)}],
//     })
//   }

//   if (results.length) {
//     res.status(200).send(results)
//   } else {
//     res.status(200).send('nothing found')
//   }
// }

// export {searchMovie}
