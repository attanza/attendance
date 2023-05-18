"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randTime = void 0;
var randTime = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
exports.randTime = randTime;
