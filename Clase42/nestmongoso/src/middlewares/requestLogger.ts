import {NestMiddleware} from '@nestjs/common';
import { Request,Response } from 'express';

export default class RequestLogger implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log(`${req.method} en ${req.url} recibido`);
        next();
    }
    
}