import styles from './Login.module.css';

export default function Login() {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['title']}>Login</div>

            <form className={styles['login-form']}>
                <div className={styles['input-container']}>
                    <i className="fa-solid fa-user"></i>
                    <input type='text' placeholder='Username' />
                </div>

                <div className={styles['input-container']}>
                    <i className="fa-solid fa-lock"></i>
                    <input type='password' placeholder='Password' />
                </div>

                <div className={styles['forgot-password']}>
                    <a href="">Forgot password?</a>
                </div>

                <div className={styles['input-container']}>
                    <button className={styles['submit-btn']} type="submit">Submit</button>
                    
                    <div className={styles['signup-link']}>
                        <span>Not a member?</span>
                        <a href="">Signup now</a>
                    </div>
                </div>
            </form>
        </div>
    )
}
