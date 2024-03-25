import { Request,Response } from "express"

//method middleware
export const logger = (req:Request, res: Response,next)=>{
    console.log('ip : ' + req.ip);
    next();
}