import 'reflect-metadata'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as createError from 'http-errors'
import {createConnection} from 'typeorm'
import * as routes from './routes/intex'
import 'dotenv/config'

// NOTE  - typeorm connection
createConnection()
  .then(() => console.log('typeorm connection complete'))
  .catch(error => console.log('TypeORM connection error: ', error))

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(
  cors({
    origin: ['http://localhost'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
)

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json('Success')
})

// NOTE - Routers

app.use('/user', routes.user)
app.use('/intro', routes.intro)
app.use('/main', routes.main)

// NOTE  - ERR Handler
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404))
  },
)

app.use((err: any, req: express.Request, res: express.Response) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500).send(err.message || 'SERVER FAULT')
  res.render('error')
})

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`),
)

module.exports = app
