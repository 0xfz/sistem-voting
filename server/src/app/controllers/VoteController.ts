import { Request, Response } from "express"
import _, { each } from "lodash"
import { generateError, generateSuccess } from "../../core/generator"
import database from "../../database"

function VoteController(){
    return {
        info(req: Request, res: Response){
            database("votes").select(database.raw("count(*) as suara_masuk")).then((data) => {
                return res.json(generateSuccess("Success", {
                    "suara_masuk": data[0]["suara_masuk"]
                }))
            })
        },
        vote(req: Request, res: Response){
            const currentUserID = req.currentUser?.id
            const dataInput = req.body.data
            console.log(req.currentUser?.has_voted)
            if(req.currentUser?.has_voted == "1"){
                return res.json(generateError("anda sudah voting"))
            }
            database("candidates").select("id", "category_id").then((data) => {
                data = JSON.parse(JSON.stringify(data))
                const candidates = _.groupBy(data, 'category_id')
                console.log(candidates)
                if(dataInput.length != Object.keys(candidates).length){
                    return res.json(generateError("candidates length tidak sama"))
                }
                let dataInsert: any[] = []
                for (let i = 0; i < dataInput.length; i++) {
                    const value = dataInput[i];
                    if(!_.has(candidates, value.category_id)){
                        return res.json(generateError("candidates tidak sama dengan kategori id"))
                    }
                    
                    if(candidates[value.category_id].findIndex((candidate) => { return candidate.id == value.candidate_id }) < 0){
                        return res.json(generateError("Invalid input data"))
                    }
                    value.user_id = currentUserID
                    dataInsert.push(value)   
                }
                database("votes").insert(dataInsert).then((data) => {
                    database("users").where("id", currentUserID).update({
                        has_voted: true
                    }).then(() => {
                        return res.json(generateSuccess("Success Voted"))
                    }).catch(() => {
                        return res.json(generateError("Err"))
                    })
                }).catch(() => {
                    return res.json(generateError("Err"))
                })
            })


        }
    }
}

export default VoteController()