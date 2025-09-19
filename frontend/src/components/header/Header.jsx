import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const showSidenav = () => {
    document.getElementById("Header-sidenav").classList.replace("d-none", "d-block");
  };

  const closeSidenav = () => {
    document.getElementById("Header-sidenav").classList.replace("d-block", "d-none");
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
            <Link className="Header-navLink">Home</Link>
          </div>
          <div className="Header-navItem Header-dropdown">
            <Link className="Header-navLink">Categories</Link>
            <div className="Header-dropdownContent left-position-0">
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Mobile Phone</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Smart Watch</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Headphone</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Earphone</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Keyboard</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Mouse</Link>
              </div>
            </div>
          </div>
          <div className="Header-navItem">
            <Link className="Header-navLink">Shop</Link>
          </div>
          <div className="Header-navItem">
            <Link className="Header-navLink">
              <i className="bi bi-cart"></i>
            </Link>
            <span className="Header-itemCount">0</span>
          </div>
          <div className="Header-navItem Header-dropdown">
            <Link className="Header-navLink">
              <i className="bi bi-person-circle"></i>
            </Link>
            <div className="Header-dropdownContent right-position-0">
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Sign In</Link>
              </div>
              <div className="Header-dropdownItem">
                <Link className="Header-dropdownLink">Sign Up</Link>
              </div>
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
            <button onClick={closeSidenav}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* Header Sidenav Content */}
        <div className="mt-3">
          <div className="Header-sidenavItem">
            <Link className="Header-sidenavLink">Home</Link>
          </div>
          {/* sd = sidenav dropdown */}
          <div className="Header-sidenavItem Header-sd">
            <Link className="Header-sidenavLink">Categories</Link>
            {/* sdc = sidenav dropdown content */}
            <div className="Header-sdc">
              {/* sdi = sidenav dropdown item */}
              <div className="Header-sdi">
                {/* sdl = sidenav dropdown link */}
                <Link className="Header-sdl">Mobile Phone</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl">Smart Watch</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl">Headphone</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl">Earphone</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl">Keyboard</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl">Mouse</Link>
              </div>
            </div>
          </div>
          <div className="Header-sidenavItem">
            <Link className="Header-sidenavLink">Shop</Link>
          </div>
          <div className="Header-sidenavItem position-relative">
            <Link className="Header-sidenavLink">
              <i className="bi bi-cart"></i>
              {/* sic = sidenav item count */}
            </Link>
            <span className="Header-sic">0</span>
          </div>
          {/* sd = sidenav dropdown */}
          <div className="Header-sidenavItem Header-sd">
            <Link className="Header-sidenavLink">
              <i className="bi bi-person-circle"></i>
            </Link>
            {/* sdc = sidenav dropdown content */}
            <div className="Header-sdc">
              {/* sdi = sidenav dropdown item */}
              <div className="Header-sdi">
                {/* sdl = sidenav dropdown link */}
                <Link className="Header-sdl">Sign In</Link>
              </div>
              <div className="Header-sdi">
                <Link className="Header-sdl">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;