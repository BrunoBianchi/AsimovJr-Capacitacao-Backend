import { NextFunction, Request, Response } from "express";

export const authentificatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (1) {
        return next();
    } else {
        return res.send("error D1")
    }
}