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

export const createPointScehma = yup.object({
    name: yup.string()
        .required('Name is required!')
        .min(5, 'Name must be at least 5 characters!')
        .max(50, 'Name must less than 50 characters!'),
    category: yup.string()
        .required('Category is required!')
        .min(5, 'Category must be at least 5 characters!')
        .max(50, 'Category must less than 50 characters!'),
    description: yup.string()
        .required('Description is required!')
        .min(5, 'Description must be at least 5 characters!')
        .max(50, 'Description must less than 50 characters!')
});