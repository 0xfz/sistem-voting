import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import { generateSuccess } from "../../core/generator"
import database from "../../database"


function VotersController(){
    return {
        addBulk(req: Request, res: Response){
            const fileInfo = req.files?.jsonData as UploadedFile
            const bufferData = fileInfo.data
            const json = JSON.parse((bufferData.toString()))
            console.log(json.data[0], 213124124)
            database.batchInsert("users", json.data).then(() => {
                return res.json(generateSuccess("siap di santap bang"))
            })
        }
    }
}

export default VotersController()