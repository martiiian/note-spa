import * as http from 'http'

import express = require('express')
import cors = require('cors')
import { router as authRouter } from './routes/auth'
import { router as notesRouter } from './routes/notes'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
const app = express()

app.use(express.static('dist'))
const server = http.createServer(app)

const options = {
  origin: process.env.FRONT_URL
}

app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

app.use(authRouter)
app.use(notesRouter)

server.listen(process.env.PORT, () => {
  console.log('Server started on', process.env.PORT)
})
