"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
exports.isRequired = 'Dette felt skal udfyldes';
exports.invalidEmailMessage = 'Angiv en gyldig emailadresse';
exports.passwordMinLength = 'Din kode skal være på mindst 6 tegn';
exports.validEmail = yup
    .string()
    .email(exports.invalidEmailMessage)
    .required(exports.isRequired);
//# sourceMappingURL=utils.js.map