import { NextFunction, Request, Response } from "express";
import { generateError } from "../../core/generator";
import jwt from 'jsonwebtoken';
import config from "../../config";
import database from "../../database";
import knex from "knex";
export const authenticated = (req: Request, res: Response, next: NextFunction) => {
    const authorization_header = req.headers["authorization"]
    if(!authorization_header) return res.json(generateError("Tidak ada authorization parameter pada header"))
    
    const jwtToken = authorization_header?.split(" ")[1]
    if(jwtToken == null) return res.json(generateError("Token kosong"))
    jwt.verify(jwtToken, config.secret, (err, user_id) => {
        console.log(err)
        if(err != null) return res.json(generateError("Ga bisa bro"))
        const user_data = database("users").where("id", user_id?.user_data.id)
        user_data.then((data) => {
            req.currentUser = data[0]
            res.locals.user = data[0]
            next()
        })
    })


}

export const allowedRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (res.locals.user?.role != role){
            return res.json(generateError("Ga bisa bro"))
        }
        next()
    
    }
}