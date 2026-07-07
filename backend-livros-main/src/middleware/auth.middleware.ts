import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { AuthPayload } from "../tipos/auth-payload";

export function authMiddleware(req: Request, res: Response, next: NextFunction)
{

    const token = req.cookies.token;

    if(!token)
    {
        res.status(400).json({
            message: "Token nao encontradoo"
        });
    }

    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload

        res.locals.user = payload;

        next();

    } catch (error) {
        res.status(400).json({
            message: "Token invalido"
        });
    }

}