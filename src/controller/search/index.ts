import {Request, Response} from 'express'
import {LessThan, Like, MoreThan} from 'typeorm'
import {Handlemovie} from '../../entity'
import {convertJsonToData} from '../../utils'

const searchMovie = async (req: Request, res: Response): Promise<void> => {
  const {method} = req.params

  let results
  if (method === 'new') {
    results = await Handlemovie.find({
      where: {date: Like('%2020%')},
      order: {
        date: 'DESC',
      },
      take: 25,
    })
  } else if (method === 'kor') {
    results = await Handlemovie.find({
      where: {docid: Like('%K%')},
      order: {
        date: 'DESC',
      },
      take: 25,
    })
  } else if (method === 'eng') {
    results = await Handlemovie.find({
      where: {docid: Like('%F%')},
      order: {
        date: 'DESC',
      },
      take: 25,
    })
  } else if (method === 'short') {
    results = await Handlemovie.find({
      where: {runtime: LessThan(91)},
      order: {
        date: 'DESC',
      },
      take: 25,
    })
  } else if (method === 'long') {
    results = await Handlemovie.find({
      where: {runtime: MoreThan(150)},
      order: {
        date: 'DESC',
      },
      take: 25,
    })
  }

  if (results) {
    let temp = []
    results.forEach(el => temp.push(convertJsonToData(el)))
    res.status(200).send(temp)
  } else {
    res.status(200).send('nothing found')
  }
}

export {searchMovie}
