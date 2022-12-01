import express = require('express')
import fs = require('fs/promises')
import fsStandart = require('fs')
import * as readline from 'readline'
import path = require('path')
import multer = require('multer')

const router = express.Router()

// todo: validation, error catching, authorization
router.post('/signin', multer().none(), async (req, res) => {
  const { email, password } = req.body

  const filePath = path.resolve(__dirname, '../db/users.csv')

  const rl = readline.createInterface({
    input: fsStandart.createReadStream(filePath),
    crlfDelay: Infinity,
  })

  rl.on('line', (line) => {
    const [dbEmail,, dbPassword] = line.split(',')
    if (dbEmail === email && dbPassword === password) {
      res.json({ result: 'success', email })
      rl.close()
    }
  })

  rl.on('close', () => {
    res.status(400).send()
  })
})

// todo: validation, error catching, authorization
router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body

  const filePath = path.resolve(__dirname, '../db/users.csv')

  try {
    // как в старые добрые, ага, ага
    await fs.appendFile(filePath, `${email},${name},${password}`)
  } catch (e) {
    res.status(500).send()
    console.error(e)
  }

  res.json({ success: true })
})

export { router }
