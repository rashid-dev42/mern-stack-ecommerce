import Footer from "../footer/Footer";
import Header from "../header/Header";

const Layout = (props) => {
  return (
    <div>
      <Header/>
      {props.children}<br/>
      <Footer/>
    </div>
  );
};

export default Layout;