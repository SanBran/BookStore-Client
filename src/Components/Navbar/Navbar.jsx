import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { overlayProfile } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import profileLogo from "../../sources/profile-user.png";

const Navbar = () => {
  //const [overlayPerfile,setOverlayPerfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showOverlayPerfile = useSelector((state) => state.overlayProfile);
  const access = useSelector((state) => state.access[0]);
  
  const handleOverlayToggle = () => {
    if (access) {
      dispatch(overlayProfile(showOverlayPerfile));
      console.log(showOverlayPerfile);
    } else {
      navigate("/access");
    }
  };
  return (
    <nav className={styles.container}>
      <div>
        <Link to="/">
          <h1 className={styles.logo}>Book Store</h1>
        </Link>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <div className={styles.profile}>
        <img
          className={styles.profile}
          src={profileLogo}
          alt=""
          onClick={handleOverlayToggle}
        />
      </div>
    </nav>
  );
};

export default Navbar;
