import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required!')
        .min(5, 'Username should be at least 5 characters long!')
        .max(30,'Username should be less than 30 characters long!'),
    password: yup.string()
    .required('Password is required!')
    .min(5, 'Password should be at least 5 characters long!')
    .max(10,'Password should be less than 10 characters long!')
});