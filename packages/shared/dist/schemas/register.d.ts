import * as yup from 'yup';
export declare const registerSchema: yup.ObjectSchema<yup.Shape<object, {
    name: string;
    email: string;
    password: string;
}>>;
