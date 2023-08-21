import styles from './Header.module.css';

import { Link } from 'react-router-dom';

export default function Header() {
    const options = [
        { name: 'Map', route: '/map', icon: 'fa-regular fa-location-dot fa-beat' },
        { name: 'Login', route: '/login', icon: 'fa-regular fa-user' },
        { name: 'Home', route: '/', icon: 'fa-regular fa-house-chimney' }
    ];

    const getAllOptions = () => {
        if (!options || options.length === 0) {
            return null;
        }

        return options.map((option, index) => (
            <li key={index} className={styles['option']}>
                <Link to={option.route} className={styles['option-link']}>
                    <span className={styles['option-name']}>{option.name}</span>
                    <i className={option.icon}></i>
                </Link>
            </li>
        ))
    }

    return (
        <>
            <header className={styles['header']}>
                <section className={styles['header__navbar']}>
                    <div className={styles['img-container']}>
                        <Link to="/">
                            <img className={styles['img']} src="/images/logo.png" />
                        </Link>
                    </div>

                    <ul className={styles['navbar__options']}>
                        {getAllOptions()}
                    </ul>
                </section>
            </header>
        </>
    )
}
