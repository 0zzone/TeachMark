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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var axios_1 = __importDefault(require("axios"));
function getMessages(token, accountID) {
    return __awaiter(this, void 0, void 0, function () {
        var data, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    data = "data={\"token\": \"" + token + "\"}";
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/eleves/" + accountID + "/messages.awp?verbe=getall&typeRecuperation=received&orderBy=date&order=desc&page=0&itemsPerPage=20&onlyRead=&query=&idClasseur=0", data)];
                case 1:
                    result = _b.sent();
                    return [2, result.data];
                case 2:
                    _a = _b.sent();
                    return [2, null];
                case 3: return [2];
            }
        });
    });
}
function getTimeline(token, accountID) {
    return __awaiter(this, void 0, void 0, function () {
        var date, data, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    date = new Date().toISOString().split("T")[0], data = "data={\"dateDebut\": \"" + date + "\", \"dateFin\": \"" + date + "\", \"avecTrous\": \"false\", \"token\": \"" + token + "\"}";
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/E/" + accountID + "/emploidutemps.awp?verbe=get&", data)];
                case 1:
                    result = _b.sent();
                    return [2, result.data];
                case 2:
                    _a = _b.sent();
                    return [2, null];
                case 3: return [2];
            }
        });
    });
}
function getNotes(token, accountID) {
    return __awaiter(this, void 0, void 0, function () {
        var data, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    data = "data={\"token\": \"" + token + "\"}";
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/eleves/" + accountID + "/notes.awp?verbe=get&", data)];
                case 1:
                    result = _b.sent();
                    return [2, result.data];
                case 2:
                    _a = _b.sent();
                    return [2, null];
                case 3: return [2];
            }
        });
    });
}
function accounts(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = "data={\"identifiant\": \"" + username + "\", \"motdepasse\": \"" + password + "\"}";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/login.awp", data)];
                case 2:
                    response = _b.sent();
                    return [2, response.data.data.accounts];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function login(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = "data={\"identifiant\": \"" + username + "\", \"motdepasse\": \"" + password + "\"}";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/login.awp", data)];
                case 2:
                    response = _b.sent();
                    return [2, response.data.token];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function getCloud(token, accountID) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = "data={\"token\": \"" + token + "\"}";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/cloud/E/" + accountID + ".awp?verbe=get&", data)];
                case 2:
                    response = _b.sent();
                    return [2, response.data];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function getSanctions(token, accountID) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = "data={\"token\": \"" + token + "\"}";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/eleves/" + accountID + "/viescolaire.awp?verbe=get&", data)];
                case 2:
                    response = _b.sent();
                    return [2, response.data];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function getClassLife(token, classID) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = "data={\"token\": \"" + token + "\"}";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/Classes/" + classID + "/viedelaclasse.awp?verbe=get&", data)];
                case 2:
                    response = _b.sent();
                    return [2, response.data];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function getHomeworks(token, accountID) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = "data={\"token\": \"" + token + "\"}";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/Eleves/" + accountID + "/cahierdetexte.awp?verbe=get&", data)];
                case 2:
                    response = _b.sent();
                    return [2, response.data];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function getDocuments(token) {
    return __awaiter(this, void 0, void 0, function () {
        var data, response, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = "data={\"token\": \"" + token + "\"}";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("https://api.ecoledirecte.com/v3/elevesDocuments.awp?verbe=get&", data)];
                case 2:
                    response = _b.sent();
                    return [2, response.data];
                case 3:
                    _a = _b.sent();
                    return [2, null];
                case 4: return [2];
            }
        });
    });
}
function getClassId(account) {
    return account.profile.classe.id;
}
module.exports = {
    login: login,
    getTimeline: getTimeline,
    getMessages: getMessages,
    getNotes: getNotes,
    getCloud: getCloud,
    getClassId: getClassId,
    getClassLife: getClassLife,
    getSanctions: getSanctions,
    getHomeworks: getHomeworks,
    getDocuments: getDocuments,
    accounts: accounts
};
