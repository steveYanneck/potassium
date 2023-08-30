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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./../../../config/botconfig.json");
const { encrypt, decrypt } = require("./encryption.js");
const postgres_1 = __importDefault(require("postgres"));
//@ts-ignore
const pg = __importStar(require("pg"));
const pgClient = new pg.Client({
    connectionString: config.postgresUrl
});
pgClient.connect();
const sql = (0, postgres_1.default)(config.postgresUrl);
module.exports = {
    fetch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = encrypt(id);
            const response = yield pgClient.query(`SELECT * FROM user_data WHERE user_id='${key}'`);
            if (response.rows[0]) {
                const userData = JSON.parse(decrypt(response.rows[0].userdata));
                return userData;
            }
            else {
                console.log("no data found");
                return undefined;
            }
        });
    },
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = encrypt(id);
            const response = yield pgClient.query(`SELECT * FROM user_data WHERE user_id='${key}'`);
            if (!response.rows[0])
                return false;
            yield pgClient.query(`UPDATE user_data SET userdata='${encrypt(data)}' WHERE user_id='${key}'`);
            return true;
        });
    },
    create(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = encrypt(member.id);
            const data = {
                firstJoined: member.joinedTimestamp,
                roles: member.roles.cache,
                regularMember: false,
                banned: false,
                warnings: [],
            };
            const encryptedData = encrypt(data);
            const outputTable = {
                data: data,
                encryptedData: encryptedData
            };
            console.log(outputTable);
            yield pgClient.query(`INSERT INTO user_data (user_id, userdata) VALUES ('${key}', '${encryptedData}')`);
            return true;
        });
    },
    fetchAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield pgClient.query(`SELECT * FROM user_data`);
            let userData = response.rows.map(function (row) {
                const data = {
                    user_id: decrypt(row.user_id),
                    userData: JSON.parse(decrypt(row.userdata))
                };
                return data;
            });
            return userData;
        });
    }
};
