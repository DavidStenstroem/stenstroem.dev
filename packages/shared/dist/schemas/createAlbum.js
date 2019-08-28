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
exports.createAlbumSchema = yup.object().shape({
    title: yup
        .string()
        .required(utils_1.isRequired)
        .min(3, 'Titlen er for kort - den skal være på mindst tre tegn')
        .max(30, 'Title er for lang - den må maks. være på 30 tegn'),
    description: yup
        .string()
        .nullable()
        .notRequired(),
    media: yup
        .array()
        .of(yup.string())
        .required(utils_1.isRequired)
        .max(5, 'Du kan højst uploade 5 emner ad gangen'),
});
//# sourceMappingURL=createAlbum.js.map