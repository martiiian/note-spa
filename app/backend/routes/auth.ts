import express = require('express')
import fs = require('fs/promises')
import fsStandart = require('fs')
import * as readline from 'readline'
import path = require('path')
import multer = require('multer')
import jwt = require('jsonwebtoken')
import bcrypt = require('bcryptjs')

const router = express.Router()
const { NODE_ENV, JWT_SECRET } = process.env

// todo: validation, error catching, authorization
router.post('/signin', multer().none(), async (req, res) => {
  const { email, password } = req.body

  const filePath = path.resolve(__dirname, '../db/users.csv')

  const rl = readline.createInterface({
    input: fsStandart.createReadStream(filePath),
    crlfDelay: Infinity,
  })

  rl.on('line', (line) => {
    const [dbEmail, dbName, dbPassword] = line.split(',')
    if (dbEmail !== email) {
      rl.close()
      return
    }

    bcrypt.compare(password, dbPassword)
      .then((matched) => {
        if (!matched) {
          rl.close()
          return
        }
        const token = jwt.sign(
          { email },
          NODE_ENV === 'production' ? JWT_SECRET as string : 'dev_secret',
          { expiresIn: '7d' }
        )

        res.status(200).json({ user: { email, dbName }, token })

        rl.close()
      })
  })

  rl.on('close', () => {
    // res.status(400).send()
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
