import styles from './Login.module.css';

import { loginSchema } from '../../schemas/schemas';
import { LoginFormInfo } from '../../types/types';

import { classNameValidator } from '../../services/service';

import { useFormik } from "formik";
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const { login } = useAuthContext();

    const navigate = useNavigate();

    const handleLogin = (loginFormInfo: LoginFormInfo, formikBag: any) => {
        const info = {
            username: loginFormInfo.username
        }

        login(info);
        navigate('/');
        formikBag.resetForm();
    }

    const { values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: handleLogin
    });

    const getErrorMessage = (errorMessage: string) => (
        <span className={styles['error-msg']}>{errorMessage}</span>
    )

    return (
        <div className={styles['wrapper']}>
            <div className={styles['title']}>Login Form</div>

            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <div className={styles['input-container']}>
                    <section className={styles['inp-wrapper']}>
                        <i className={'fa-solid fa-user ' + classNameValidator(
                            styles,
                            (!!errors.username && !!touched.username),
                            'icon',
                            'invalid-icon')}>
                        </i>
                        <input
                            id='username'
                            className={classNameValidator(
                                styles,
                                (!!errors.username && !!touched.username),
                                'input', 
                                'invalid-input'
                            )}
                            type='text'
                            placeholder='Username'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                    </section>

                    {(errors.username && touched.username) && getErrorMessage(errors.username)}
                </div>

                <div className={styles['input-container']}>
                    <section className={styles['inp-wrapper']}>
                        <i className={'fa-solid fa-lock ' + classNameValidator(
                            styles,
                            (!!errors.password && !!touched.password),
                            'icon',
                            'invalid-icon')}></i>
                        <input
                            id='password'
                            className={classNameValidator(
                                styles,
                                (!!errors.password && !!touched.password), 
                                'input', 
                                'invalid-input'
                            )}
                            type='password'
                            placeholder='Password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} />
                    </section>

                    {(errors.password && touched.password) && getErrorMessage(errors.password)}

                </div>

                <div className={styles['forgot-password']}>
                    <a href="">Forgot password?</a>
                </div>

                <div className={styles['btn-container']}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles['submit-btn']}
                    >
                        Submit
                    </button>

                    <div className={styles['signup-link']}>
                        <span>Not a member?</span>
                        <a href="">Signup now</a>
                    </div>
                </div>
            </form>
        </div>
    )
}
