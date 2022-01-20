import crypto from "crypto"

export function sha256(msg: string){
    const hash = crypto.createHash("sha256")
    hash.update(msg)
    return hash.digest("hex")
}
export function compare(hash1: string, hash2: string){
    const hash1Buffer = Buffer.from(hash1, "hex")
    const hash2Buffer = Buffer.from(hash2, "hex")
    return crypto.timingSafeEqual(hash1Buffer, hash2Buffer)
}