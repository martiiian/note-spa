import stream = require('node:stream')
import express = require('express')
import fs = require('node:fs/promises')
import fsStandard = require('node:fs')
import readline = require('node:readline')
import path = require('node:path')

const router = express.Router()

interface Note {
  id: number
  title: string
  description: string
  parent?: number
}

const filePath = path.resolve(__dirname, '../db/notes.csv')

async function getLastLine() {
  const inStream = fsStandard.createReadStream(filePath)
  const outStream = new stream.Writable()

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface(inStream, outStream)

    let lastLine = ''
    rl.on('line', (line) => {
      if (line.length >= 1) {
        lastLine = line
      }
    })

    rl.on('close', () => {
      resolve(lastLine)
    })

    rl.on('error', () => {
      reject()
    })
  })
}

async function getMaxId(): Promise<number> {
  const lastLine = await getLastLine()

  if (typeof lastLine !== 'string') return 0

  const [id] = lastLine.split(',')

  return Number(id)
}

function show() {

}

router.get('/notes', (req, res) => {
  const inStream = fsStandard.createReadStream(filePath)
  const outStream = new stream.Writable()
  const notes: Note[] = []

  const rl = readline.createInterface(inStream, outStream)

  rl.on('line', (line) => {
    const [id, title, description, parent] = line.split(',')
    notes.push({ id: Number(id), title, description, parent: Number(parent) })
  })

  rl.on('error', () => {
    res.status(500).send()
  })

  rl.on('close', () => {
    res.status(200).json({ data: notes })
  })
})

router.post('/notes', async (req, res) => {
  const { description, title, parent = '' } = req.body

  try {
    const id = await getMaxId() + 1
    await fs.appendFile(filePath, `${id},${title},${description},${parent}`)
    res.status(200).send({
      id,
      title,
      description,
      parent
    })
  } catch (e) {
    res.status(400).send()
    console.error(e)
  }
})

function update() {

}

function remove() {

}

export { router }
