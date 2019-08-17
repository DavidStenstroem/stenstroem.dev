import * as yup from 'yup';
export declare const loginSchema: yup.ObjectSchema<yup.Shape<object, {
    email: string;
    password: string;
}>>;
