import * as yup from 'yup';
export declare const changePasswordSchema: yup.ObjectSchema<yup.Shape<{}, {
    currentPassword: string;
    newPassword: string;
}>>;
