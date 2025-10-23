import "./Header.css";
import { useSelector } from "react-redux";
import MiniCart from "../miniCart/MiniCart";
import { Link } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector(state => state.cartItems);

  const showSidenav = () => {
    document.getElementById("Header-sidenav").classList.replace("d-none", "d-block");
  };

  const closeSidenav = () => {
    document.getElementById("Header-sidenav").classList.replace("d-block", "d-none");
  };

  const showMiniCart = () => {
    document.getElementById("Header-miniCart").classList.replace("d-none", "d-block");
    closeSidenav();
  };

  const closeMiniCart = () => {
    document.getElementById("Header-miniCart").classList.replace("d-block", "d-none");
  };

  return (
    <div className="Header">
      {/* Header Heading and Navbar Container */}
      <div className="d-flex h-100 w-100 justify-content-between">
        {/* Header Heading */}
        <div className="Header-heading">
          <h4 className="px-3">Lorem-Ipsum</h4>
        </div>

        {/* Header Navbar */}
        <div className="Header-navbar h-100">
          <div className="Header-navItem">
            <Link className="Header-navLink" to="/">Home</Link>
          </div>
          <div className="Header-navItem Header-dropdown">
            <Link className="Header-navLink">Categories</Link>
            <div className="Header-dropdownContent left-position-0">
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/shop?category=Mobile Phone">Mobile Phone</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/shop?category=Watch">Watch</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/shop?category=Headphone">Headphone</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/shop?category=Earphone">Earphone</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/shop?category=Keyboard">Keyboard</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/shop?category=Mouse">Mouse</Link>
              </div>
            </div>
          </div>
          <div className="Header-navItem">
            <Link className="Header-navLink" to="/shop">Shop</Link>
          </div>
          <div className="Header-navItem">
            <span role="button" className="Header-navLink" onClick={showMiniCart}>
              <i className="bi bi-cart"></i>
            </span>
            <span className="Header-itemCount">{cartItems.length}</span>
          </div>
          <div className="Header-navItem Header-dropdown">
            <span role="button" className="Header-navLink">
              <i className="bi bi-person-circle"></i>
            </span>
            <div className="Header-dropdownContent right-position-0">
              {!localStorage.getItem("email") && <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/sign-in">Sign In</Link>
              </div>}
              {!localStorage.getItem("email") && <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/sign-up">Sign Up</Link>
              </div>}
              {localStorage.getItem("email") && <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Dashboard</Link>
              </div>}
              {localStorage.getItem("email") && <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink" to="/sign-out">Sign Out</Link>
              </div>}
            </div>
          </div>
        </div>

        {/* Header Sidenav Button */}
        <button className="Header-sidenavButton" onClick={showSidenav}>
          <i className="bi bi-list"></i>
        </button>
      </div>

      {/* Header Sidenav */}
      <div className="Header-sidenav d-none" id="Header-sidenav">
        {/* Header Sidenav Heading */}
        <div className="Header-sidenavHeading">
          <div className="d-flex h-100 justify-content-between align-items-center">
            <h4>Menu</h4>
            <button className="close-btn" onClick={closeSidenav}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* Header Sidenav Content */}
        <div className="mt-3">
          <div className="Header-sidenavItem">
            <Link className="Header-sidenavLink" to="/">Home</Link>
          </div>
          {/* sd = sidenav dropdown */}
          <div className="Header-sidenavItem Header-sd">
            <Link className="Header-sidenavLink">Categories</Link>
            {/* sdc = sidenav dropdown content */}
            <div className="Header-sdc">
              {/* sdi = sidenav dropdown item */}
              <div className="Header-sdi">
                {/* sdl = sidenav dropdown link */}
                <Link className="Header-sdl" to="/shop?category=Mobile Phone">Mobile Phone</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl" to="/shop?category=Watch">Watch</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl" to="/shop?category=Headphone">Headphone</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl" to="/shop?category=Earphone">Earphone</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl" to="/shop?category=Keyboard">Keyboard</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl" to="/shop?category=Mouse">Mouse</Link>
              </div>
            </div>
          </div>
          <div className="Header-sidenavItem">
            <Link className="Header-sidenavLink" to="/shop">Shop</Link>
          </div>
          <div className="Header-sidenavItem position-relative">
            <Link className="Header-sidenavLink" onClick={showMiniCart}>
              <i className="bi bi-cart"></i>
            </Link>
            {/* sic = sidenav item count */}
            <span className="Header-sic">{cartItems.length}</span>
          </div>
          {/* sd = sidenav dropdown */}
          <div className="Header-sidenavItem Header-sd">
            <Link className="Header-sidenavLink">
              <i className="bi bi-person-circle"></i>
            </Link>
            {/* sdc = sidenav dropdown content */}
            <div className="Header-sdc">
              {/* sdi = sidenav dropdown item */}
              {!localStorage.getItem("email") && <div className="Header-sdi">
                {/* sdl = sidenav dropdown link */}
                <Link className="Header-sdl" to="/sign-in">Sign In</Link>
              </div>}
              {!localStorage.getItem("email") && <div className="Header-sdi">
                <Link className="Header-sdl" to="/sign-up">Sign Up</Link>
              </div>}
              {localStorage.getItem("email") && <div className="Header-sdi">
                {/* sdl = sidenav dropdown link */}
                <Link className="Header-sdl">Dashboard</Link>
              </div>}
              {localStorage.getItem("email") && <div className="Header-sdi">
                <Link className="Header-sdl" to="/sign-out">Sign Out</Link>
              </div>}
            </div>
          </div>
        </div>
      </div>

      {/* Mini Cart Container */}
      <div className="Header-miniCart d-none" id="Header-miniCart">
        {/* mch = mini cart header */}
        <div className="Header-mch">
          <div className="d-flex h-100 justify-content-between align-items-center">
            <h4 className="ps-3">Mini Cart</h4>
            <button className="close-btn" onClick={closeMiniCart}><i className="bi bi-x-lg"></i></button>
          </div>
        </div>
        <MiniCart/>
      </div>
    </div>
  );
};

export default Header;