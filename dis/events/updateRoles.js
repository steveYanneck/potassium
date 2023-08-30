"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const datastore = require("./../modules/data/main.js");
module.exports = {
    name: "guildMemberUpdate",
    execute(client, oldMember, newMember) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("fired");
            if (oldMember.roles.cache === newMember.roles.cache)
                return;
            console.log("Roles changed");
            let userdata = yield datastore.fetch(oldMember.id);
            if (!userdata)
                return;
            userdata.roles = newMember.roles.cache;
            datastore.update(newMember.id, userdata);
        });
    }
};
