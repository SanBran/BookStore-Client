import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import BooksDetail from "./Views/BooksDetail/BooksDetail";
import "./App.css";
import Access from "./Views/Access/Access";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Views/Profile/Profile";
import Wishlist from "./Components/Wishlist/Wishlist";
import History from "./Components/History/History";
import Settings from "./Views/Settings/Settings";
import Filters from "./Components/Filters/Filters";
import { useSelector } from "react-redux";



function App() {
  const showOverlayPerfile= useSelector(state=> state.overlayProfile);

  return (
    <>
    {showOverlayPerfile && <Profile />}

    {location.pathname !== "/profile" && location.pathname !== "/access" ? (
        <Navbar  />
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/access" element={<Access />} />

        <Route path="/details:id" element={<BooksDetail />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/history" element={<History />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/Filters" element={<Filters />} />
        
      </Routes>
    </>
  );
}

export default App;   

