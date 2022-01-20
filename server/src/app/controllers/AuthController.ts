import { Request, Response } from 'express'
import { generateError, generateSuccess } from '../../core/generator'
import {compare, sha256} from '../../core/hash'
import jwt from 'jsonwebtoken'
import DB from '../../database/index'
import config from '../../config'
import _, { trim } from 'lodash'
import Joi from 'joi'

function AuthController(){
    return {
        login(req: Request, res: Response) {
            const schema = Joi.object({
                nisn: Joi.string().required(),
                nis: Joi.string().required()
            })
            
            const validate = schema.validate(req.body)
            if(_.has(validate, "error")){
                return res.json(generateError("Input error"))
            }
            const nisn = req.body.nisn
            const nis = req.body.nis

            DB.table("users").where("nisn", "=", nisn).andWhere("nis", "=", nis).then((users) => {
                console.log(users)
                if(!users.length){
                    return res.json(generateError("NIS/NISN tidak ditemukan"))
                }

                const payload = {
                    user_data: users[0]
                }
                const token = jwt.sign(payload, config.secret, {expiresIn: "24h"})
                return res.json(generateSuccess("Login Success",{token: token}))
                
            })
            
        }
    } 
}

export default AuthController()