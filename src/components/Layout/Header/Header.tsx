import { useAuthContext } from '../../../contexts/AuthContext';
import styles from './Header.module.css';

import { Link, useNavigate } from 'react-router-dom';

interface NavOption {
    name: string,
    route: string,
    icon: string,
    isAlwaysIncluded?: boolean,
    isAuthenticated?: boolean
}

export default function Header() {
    const { user, isAuthenticated, logout } = useAuthContext();
    const navigate = useNavigate();

    const options: NavOption[] = [
        { 
            name: 'Home',
            route: '/',
            icon: 'fa-regular fa-house-chimney',
            isAlwaysIncluded: true
        },
        { 
            name: 'Map',
            route: '/map',
            icon: 'fa-regular fa-location-dot fa-beat',
            isAuthenticated: true,
        },
        { 
            name: 'Login',
            route: '/login',
            icon: 'fa-regular fa-user',
            isAuthenticated: false,
        }
    ];

    const filters = {
        isAuthenticated: (option: NavOption) => 
            option.isAuthenticated || option.isAlwaysIncluded,
        isNotAuthenticated: (option: NavOption) =>
            !option.isAuthenticated || option.isAlwaysIncluded
    }

    const getAllOptions = () => {
        if (!options || options.length === 0) {
            return null;
        }

        return options
            .filter(option => isAuthenticated
                ? filters.isAuthenticated(option)
                : filters.isNotAuthenticated(option))
            .map((option, index) => (
                <li key={index} className={styles['option']}>
                    <Link to={option.route} className={styles['option-link']}>
                        <span className={styles['option-name']}>{option.name}</span>
                        <i className={option.icon}></i>
                    </Link>
                </li>
            ))
    }

    const handleLogout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();

        logout();
        navigate('/');
    };

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

                        {isAuthenticated && (
                            <>
                                <li className={styles['option']} >
                                    <Link to="" onClick={handleLogout} className={styles['option-link']}>
                                        <span className={styles['option-name']}>Logout</span>
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </Link>
                                </li>

                                <li className={styles['option']}>
                                    <p>Hello {user?.username}!</p>
                                </li>
                            </>
                        )}
                    </ul>
                </section>
            </header>
        </>
    )
}
