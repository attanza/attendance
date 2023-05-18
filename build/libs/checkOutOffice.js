"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOutOffice = void 0;
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var moment_1 = __importDefault(require("moment"));
var randTime_1 = require("./randTime");
var getToken_1 = require("./getToken");
var checkOutOffice = function (NIK, PASSWORD) { return __awaiter(void 0, void 0, void 0, function () {
    var data, today, hour, minute, seconds, time, token, config, resp, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                data = new form_data_1.default();
                today = (0, moment_1.default)().format('YYYY-MM-DD');
                hour = (0, randTime_1.randTime)(18, 20);
                minute = (0, randTime_1.randTime)(10, 55);
                seconds = (0, randTime_1.randTime)(10, 55);
                time = "".concat(hour, ":").concat(minute, ":").concat(seconds);
                return [4 /*yield*/, (0, getToken_1.getToken)(NIK, PASSWORD)];
            case 1:
                token = _a.sent();
                data.append('begin_date', today);
                data.append('date', today);
                data.append('time', time);
                data.append('end_date', '9999-12-31');
                data.append('business_code', '5000');
                data.append('personal_number', NIK);
                data.append('presence_type', 'CO');
                data.append('emoticon', ')');
                data.append('location', '-6.1927882, 106.845959');
                data.append('change_user', NIK);
                data.append('presensi_status', '00');
                data.append('description', 'wfo');
                data.append('evidence', 'null');
                data.append('presensi_approve', '1');
                data.append('health_status', '3');
                data.append('working_status_location', '3');
                data.append('health_description', 'HEALTHY');
                data.append('working_location_description', 'OFFICE');
                data.append('transport_status', '2');
                data.append('transport_description', 'PRIVATE');
                data.append('building_id', 'KN000KR');
                config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: "https://newlarisa.pegadaian.co.id/api/users/".concat(NIK, "/presensinew/").concat(NIK, "/buscd/5000"),
                    headers: __assign({ Authorization: token, 'Content-Type': 'multipart/form-data' }, data.getHeaders()),
                    data: data,
                };
                return [4 /*yield*/, (0, axios_1.default)(config).then(function (res) { return res.data; })];
            case 2:
                resp = _a.sent();
                return [2 /*return*/, resp];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkOutOffice = checkOutOffice;
