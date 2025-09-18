import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
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
      </div>
    </div>
  );
};

export default Header;