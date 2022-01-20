import { Request, RequestHandler, Response } from "express"
import { generateError, generateSuccess } from "../../core/generator"
import database from "../../database"
import _, { Dictionary, orderBy } from "lodash"
import knex from "knex"
let dataCache: any = {}
function CategoryController(){
    return {
        all(req: Request, res: Response){
            database("category").select("*").then((data) => {
                return res.send(generateSuccess("ok", data))
            }).catch(() => {
                return res.send(generateError("Unexpected Error"))
            })
        },
        getAllCandidates(req: Request, res: Response){
            database("candidates").select("*").then((data) => {
                let result = JSON.parse(JSON.stringify(_.groupBy(data, "category_id")))
                result  = _.mapValues(result, (v) => { return _.orderBy(v, ["no_urut"], ["asc"]) })

                return res.json(generateSuccess("", result))
            }).catch(() => {
                return res.json(generateError("Err"))
            })
        },
        get(req: Request, res: Response){
            const category_id = parseInt(req.params.category_id)
            database("candidates").select(
                "candidates.id", 
                "candidates.full_name", 
                "candidates.kelas", 
                "candidates.candidate_profile_picture", 
                "candidates.visi", 
                "candidates.misi"
            ).where("candidates.category_id", "=", category_id).orderBy("candidates.no_urut").then((data) => {
                return res.json(generateSuccess("okelah", data))
            }).catch(() => {
                return res.send(generateError("Unexpected Error"))
            })
        },
        result(req:Request, res:Response){
            const category_id = req.params.category_id
            database("votes").select(
                "votes.id", 
                "votes.candidate_id", 
                "votes.category_id", 
                "votes.user_id",
            )
            .select(database.raw("COUNT(*) as total_suara")).groupBy("votes.candidate_id").where("category_id", category_id).then(async (data) => {
                let dataSuaraMasuk = 0
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    dataSuaraMasuk = dataSuaraMasuk + element.total_suara
                    
                }
                if(!_.has(dataCache, "users")){
                    dataCache.users = await database("users").select(database.raw("count(*) as total_pemilih")).where("role", "voter")
                    dataCache.candidates = await database("candidates")
                    console.log("hey hey hey")
                    
                }
                for (let i = 0; i < data.length; i++) {
                    let index = dataCache.candidates.findIndex((v: any) => v.id == data[i].candidate_id)
                    let total_suara = data[i].total_suara
                    data[i] = dataCache.candidates[index]
                    data[i].total_suara = total_suara
                    data[i].presentase = Math.round((total_suara/dataSuaraMasuk) * 100)
                    
                }
                let result = {
                    data: data,
                    suara_masuk: dataSuaraMasuk,
                    total_pemilih: dataCache.users[0].total_pemilih
                }
                return res.json(generateSuccess("nyoh",result))
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}

export default CategoryController()