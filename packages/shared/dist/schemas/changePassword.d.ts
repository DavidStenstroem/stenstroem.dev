import * as yup from 'yup';
export declare const changePasswordSchema: yup.ObjectSchema<yup.Shape<object, {
    currentPassword: string;
    newPassword: string;
}>>;
