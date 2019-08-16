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
const utils_1 = require("./utils");
exports.registerSchema = yup.object().shape({
    name: yup.string().required(utils_1.isRequired),
    email: utils_1.validEmail,
    password: yup
        .string()
        .required(utils_1.isRequired)
        .min(6, utils_1.passwordMinLength),
});
//# sourceMappingURL=register.js.map