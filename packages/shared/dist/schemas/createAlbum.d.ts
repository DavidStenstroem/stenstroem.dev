import * as yup from 'yup';
export declare const createAlbumSchema: yup.ObjectSchema<yup.Shape<{}, {
    title: string;
    description: string;
    sharedWith: string[];
    media: {}[];
    files: {}[];
}>>;
