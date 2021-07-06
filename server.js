const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const fs = require('fs')
const file = './data.json'
const init = './init.json'
const { F_OK } = require('constants')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.get('/api/init', (req, res) => {
        fs.access(file, F_OK, (err) => {
            if (err) {
                return fs.readFile(init, (err, data) => {
                    if (err) throw err
                    const f = JSON.parse(data)
                    res.status(200).send(f)
                })
            }
            fs.readFile(file, (err, data) => {
                if (err) throw err
                const f = JSON.parse(data)
                res.status(200).send(f)
            })
        })
    })

    server.post('/api/init', (req, res) => {
        fs.writeFile('data.json', JSON.stringify(req.body), (err) => {
            if (err) console.log(err)
        })
        res.json(req.body)
    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
