import express, { Express, Request, Response, NextFunction, urlencoded} from 'express'
import morgan from 'morgan'
import createHttpError from 'http-errors'
import { Server } from 'http'
import dotenv from 'dotenv'
import api_route from './routes/api.route'

dotenv.config()

const createdBy: String = 'Drill Take2 (2022.Feb.10) EJS x TS'
const app: Express = express()

app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(morgan('dev'))

app.get('/check', (req: Request, res: Response, next: NextFunction) => {
    res.send(`All OK ${createdBy}`)
})

app.use('/api', api_route)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status = err.status || 500
    res.send({
        status: res.status,
        message: err.message
    })
})

const PORT: Number = Number(process.env.PORT) || 3000
const server: Server = app.listen(PORT, () => {
    console.log(`Game! on port ${PORT} ${createdBy}`);
})
