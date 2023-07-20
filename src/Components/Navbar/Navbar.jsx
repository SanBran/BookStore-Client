import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { overlayProfile } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  //const [overlayPerfile,setOverlayPerfile] = useState(false);
  const dispatch = useDispatch();
  const showOverlayPerfile= useSelector(state=> state.overlayProfile);

  const handleOverlayToggle = () => {
    dispatch(overlayProfile(showOverlayPerfile));
    console.log(showOverlayPerfile);
  };
  return (
    <div>
      <nav>
        <div>
          <Link to="/">
            <h1 className={styles.logo}>Book Store</h1>
          </Link>
        </div>
        <div className={styles.search}>
          <SearchBar />
        </div>
      </nav>
      <div className={styles.profile}>
        <button onClick={handleOverlayToggle}>Perfil</button>
      </div>
    </div>
  );
};

export default Navbar;
