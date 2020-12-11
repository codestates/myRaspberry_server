import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import createError from 'http-errors'
import {createConnection} from 'typeorm'
import * as routes from './routes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import passport from 'passport'
import session from 'express-session'
import {isLoggedIn} from './utils'
require('./passport')

import 'dotenv/config'
const http = require('http')
const https = require('https')
const fs = require('fs')
const privateKey = fs.readFileSync(__dirname + '/cert/privkey.pem', 'utf8')
const certificate = fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8')
const chain = fs.readFileSync(__dirname + '/cert/chain.pem', 'utf8')
const credentials = {key: privateKey, cert: certificate, ca: chain}

// NOTE  - typeorm connection2
createConnection()
  .then(() => console.log('typeorm connection complete'))
  .catch(error => console.log('TypeORM connection error: ', error))

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
// app.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {maxAge: 60 * 60 * 1000},
//   }),
// )

app.use(
  cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
)

app.use(passport.initialize())
// app.use(passport.session())

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json('Success')
})

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// // NOTE - Routers
app.use('/auth', routes.auth)
app.use('/intro', routes.intro)
app.use('/main', routes.main)
app.use('/search', isLoggedIn, routes.search)
app.use('/mypage', isLoggedIn, routes.mypage)

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

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(process.env.HTTP_PORT, () =>
  console.log(`http server listen '${process.env.HTTP_PORT}' PORT`),
)
httpsServer.listen(process.env.HTTPS_PORT, () =>
  console.log(`https server listen '${process.env.HTTPS_PORT}' PORT`),
)

module.exports = app
