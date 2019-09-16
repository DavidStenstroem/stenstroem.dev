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
exports.changePasswordSchema = yup.object().shape({
    currentPassword: yup.string().required(utils_1.isRequired),
    newPassword: yup
        .string()
        .min(6, utils_1.passwordMinLength)
        .required(utils_1.isRequired),
});
//# sourceMappingURL=changePassword.js.map