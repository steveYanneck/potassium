"use strict";
//@ts-ignore
const crypto = require("crypto");
const algorithm = 'aes-256-cbc';
//@ts-ignore
const key = crypto.randomBytes(32);
//@ts-ignore
const iv = crypto.randomBytes(16);
console.log(`key: ${key.toString('hex')}`);
console.log(`iv: ${iv.toString('hex')}`);
//run this to obtain your keys to encrypt the data. Copy the generated keys and paste them in config > keys.json
