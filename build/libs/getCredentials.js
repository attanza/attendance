"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = void 0;
require("dotenv/config");
var getCredentials = function () {
    var stringNIK = process.env.NIK;
    var stringPassword = process.env.PASSWORD;
    var niks = stringNIK.split(',');
    var passwords = stringPassword.split(',');
    return { niks: niks, passwords: passwords };
};
exports.getCredentials = getCredentials;
