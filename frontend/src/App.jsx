import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <Home/>
          </Layout>}/>
          <Route path="/categories" element={<Layout>
            <p>This is categories page</p>
          </Layout>}/>
          <Route path="/shop" element={<Layout>
            <p>This is shop page</p>
          </Layout>}/>
          <Route path="/cart" element={<Layout>
            <p>This is cart page</p>
          </Layout>}/>
          <Route path="/sign-in" element={<Layout>
            <p>This is sign-in page</p>
          </Layout>}/>
          <Route path="/sign-up" element={<Layout>
            <p>This is sign-up page</p>
          </Layout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
