import { Router, Request, Response, NextFunction } from 'express'

const api: Router = Router()

api.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({
        status: 200,
        message: "Hi from API!"
    })
})

export default api