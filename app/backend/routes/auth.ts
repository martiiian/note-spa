import express = require('express')
import fs = require('fs/promises')
import fsStandart = require('fs')
import * as readline from 'readline'
import path = require('path')
import multer = require('multer')
import jwt = require('jsonwebtoken')
import bcrypt = require('bcryptjs')

const { NODE_ENV, JWT_SECRET } = process.env
const router = express.Router()
const filePath = path.resolve(__dirname, '../db/users.csv')

// todo: validation, error catching, authorization
router.post('/signin', multer().none(), async (req, res) => {
  const { email, password } = req.body

  const rl = readline.createInterface({
    input: fsStandart.createReadStream(filePath),
    crlfDelay: Infinity,
  })
  let responseSent = false

  rl.on('line', async (line) => {
    const [dbEmail, dbName, dbPassword] = line.split(',')
    if (dbEmail !== email) {
      responseSent = true
      res.status(422).send({ status: 'Email or password wrong' })
      rl.close()
      return
    }

    const isPasswordOk = await bcrypt.compare(password, dbPassword)

    if (!isPasswordOk) {
      responseSent = true
      res.status(422).send({ status: 'Email or password wrong' })
      rl.close()
      return
    }

    const token = jwt.sign(
      { email },
      NODE_ENV === 'production' ? JWT_SECRET as string : 'dev_secret',
      { expiresIn: '7d' }
    )

    res.status(200).json({ user: { email, dbName }, token })
    responseSent = true

    rl.close()
  })

  rl.on('close', () => {
    if (!responseSent) res.status(400).send()
  })
})

// todo: validation, error catching, authorization
router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body

  const filePath = path.resolve(__dirname, '../db/users.csv')

  try {
    const hash = await bcrypt.hash(password, 10)
    // как в старые добрые, ага, ага
    await fs.appendFile(filePath, `${email},${name},${hash}`)
  } catch (e) {
    res.status(500).send()
    console.error(e)
  }

  res.json({ success: true })
})

export { router }
