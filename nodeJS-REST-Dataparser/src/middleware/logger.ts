import { Request, Response } from 'express'

const requestLogger = (req: Request, resp: Response, next) => {

    console.log('Request logged:', req.method, req.path)
    next()
}

export default requestLogger