import styles from './Header.module.css';

import { Link } from 'react-router-dom';

export default function Header() {
    const options = [
        { name: 'Map', route: '/map' },
        { name: 'Home', route: '/' }
    ]

    const getAllOptions = () => {
        return options.map((option, index) => (
            <li key={index} className={styles['option']}>
                <Link to={option.route}>
                    {option.name}
                </Link>
            </li>
        ))
    }

    return (
        <>
            <header className={styles['header']}>
                <section className={styles['header__navbar']}>
                    <div className={styles['circular-image']}>
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
