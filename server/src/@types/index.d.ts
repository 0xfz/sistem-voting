import { JwtPayload } from "jsonwebtoken";
interface UserData{
    role: string,
    id: number,
    full_name: string | null,
    has_voted: number
}
declare global{
    namespace Express {
        interface Request {
            currentUser?: JwtPayload | UserData
        }
    }
}