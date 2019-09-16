import * as yup from 'yup';
export declare const createAlbumSchema: yup.ObjectSchema<yup.Shape<object, {
    title: string;
    description: string;
    sharedWith: string[];
    media: unknown[];
    files: unknown[];
}>>;
