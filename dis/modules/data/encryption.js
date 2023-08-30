"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys = require("./../../../config/keys.json");
const bufferedKey = Buffer.from(keys.key, "hex");
const bufferedIv = Buffer.from(keys.iv, "hex");
const crypto = __importStar(require("crypto"));
module.exports = {
    encrypt(data) {
        if (typeof data === "string") {
            let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(bufferedKey), bufferedIv);
            let encrypted = cipher.update(data.toString());
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex');
        }
        if (typeof data === "object") {
            let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(bufferedKey), bufferedIv);
            let encrypted = cipher.update(JSON.stringify(data));
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex');
        }
    },
    decrypt(text) {
        let encryptedText = Buffer.from(text, "hex");
        let decipher = crypto.createDecipheriv('aes-256-cbc', bufferedKey, bufferedIv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
};
