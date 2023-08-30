const keys = require("./../../../config/keys.json")

const bufferedKey:any = Buffer.from(keys.key, "hex")
const bufferedIv:any = Buffer.from(keys.iv, "hex")

import * as crypto from "crypto"
module.exports = {
    encrypt(data: any) {
        if (typeof data === "string") {
            let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(bufferedKey), bufferedIv);
            let encrypted = cipher.update(data.toString());
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex')
        }
        if (typeof data === "object") {
            let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(bufferedKey), bufferedIv);
            let encrypted = cipher.update(JSON.stringify(data));
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex')
        }
    },
    
    decrypt(text:string) {
        let encryptedText = Buffer.from(text, "hex")
        let decipher = crypto.createDecipheriv('aes-256-cbc', bufferedKey, bufferedIv)
        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return decrypted.toString()
    }
}