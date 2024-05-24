import express, { NextFunction, Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
import * as jwt from 'jsonwebtoken'
const router = Router()
const prisma = new PrismaClient();

type UserPayload = {
    id: number
    userlevel: number
}

export const authenticatoken = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("failed");

    const authHeader = req.headers['authorization']
    // console.log({ authHeader });
    if (!authHeader) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    // const token=authHeader.slice(7);
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err: Error, user: UserPayload) => {
        
        if (err) {
            console.log('JWT Error');
            return res.sendStatus(403);
        }
        // console.log(user);
        
        next();
    });
};  