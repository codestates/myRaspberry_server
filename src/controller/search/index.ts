import {Request, Response} from 'express'
import {LessThan, Like, MoreThan} from 'typeorm'
import {Handlemovie} from '../../entity'

const searchMovie = async (req: Request, res: Response): Promise<void> => {
  const {method } = req.params

  let results
  if (method === 'new') {
    results = await Handlemovie.find({
      where: {date: Like('2020%')},
    take: 20
    }),
} else if (method === 'kor') {
    results = await Handlemovie.find({
      where: {docid: Like('%K%')}, 
      take: 20
    })
  } else if (method === 'eng') {
    results = await Handlemovie.find({
        where: {docid: Like('%F%')}, 
        take: 20
    },
    )} else if (method === 'short'){
    results = await Handlemovie.find({
            where: {runtime: LessThan(91)}, 
            take: 20
        },
        )
    } else if (method==='long'){
        results = await Handlemovie.find({
            where: {runtime: MoreThan(150)}, 
            take: 20
        },
        )
    }

  if (results.length) {
    res.status(200).send(results)
  } else {
    res.status(200).send('nothing found')
  }
}

export {searchMovie}
