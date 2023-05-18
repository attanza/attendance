"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workDay = void 0;
var moment_1 = __importDefault(require("moment"));
var holidays_1 = require("./holidays");
var workDay = function () {
    // Check if not holiday
    var todayDate = (0, moment_1.default)().format('DD-MM-YYYY');
    var isHoliday = holidays_1.holidays.includes(todayDate.toString());
    console.log('check if Holiday: ', isHoliday);
    if (isHoliday) {
        return false;
    }
    // Check if not Saturday / Sunday
    var today = (0, moment_1.default)().weekday();
    var workingDays = [1, 2, 3, 4, 5];
    console.log('Check if Working day: ', workingDays.includes(today));
    if (workingDays.includes(today)) {
        return true;
    }
    return false;
};
exports.workDay = workDay;
// minggu 0
// Senin 1
// Selasa 2
// Rabu 3
// kamis 4
// jumat 5
// Sabtu 6
