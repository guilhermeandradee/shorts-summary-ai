import cors from 'cors'
import express, { response } from 'express'

import { convert } from './convert.js'
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'


const port = 3333

const app = express()
app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (req, res) => {
    try {
        await download(req.params.id)
        const audioConverted = await convert()
        console.log(audioConverted)

        const result = await transcribe(audioConverted)

        console.log('Consolelog de result dentro de index', result)

        return res.json({ result })

    } catch(error) {

        console.error(error)
        return res.json({error})
    }
})

app.post('/summary', async (req, res) => {
    try{
        const result = await summarize(req.body.text)

        return res.json({ result })

    } catch(error) {

        console.error(error)
        return res.json({error})
    }
})






app.listen(port, () => console.log(`server on, port ${port}`))