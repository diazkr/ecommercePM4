
import { NextFunction, Request, Response} from "express";

export function LoggerGlobalMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
){
    req['requestTime'] = new Date(); 
    console.log(
        `Estamos haciendo el middleware global: metodo ${req.method} ruta ${req.url} hora ${req['requestTime'].toISOString()}`
    )
    next();
}