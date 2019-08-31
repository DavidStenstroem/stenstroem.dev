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
    sharedWith: yup
        .array()
        .of(yup.string())
        .nullable(),
    media: yup.array().when('files', {
        is: (files) => !files,
        then: yup
            .array()
            .of(yup.string())
            .required('Du skal vælge eller uploade mindst én fil'),
    }),
    files: yup.array().when('media', {
        is: (media) => !media,
        then: yup
            .array()
            .required('Du skal vælge eller uploade mindst én fil')
            .test('is-too-big', 'Denne fil er for stor. Maks. størrelsen er 25MB', (files) => {
            let valid = true;
            if (files) {
                files.map((file) => {
                    const size = file.size / 1024 / 1024;
                    if (size > 25) {
                        valid = false;
                    }
                });
            }
            return valid;
        }),
    }),
}, [['media', 'files']]);
//# sourceMappingURL=createAlbum.js.map