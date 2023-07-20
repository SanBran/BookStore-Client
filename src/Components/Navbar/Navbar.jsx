import {Link} from 'react-router-dom';
import styles from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar';

const Navbar= ()=>{
return(
    <nav className={styles.container}>
        <div>
            <Link to='/'><h1 className={styles.logo}>Book Store</h1></Link>
        </div>
            <div className={styles.search}>
            <SearchBar/>
            </div>
        <div className={styles.profile}>
            <Link to='/profile'> See your profile here </Link>
        </div>
    </nav>
)
}

export default Navbar;