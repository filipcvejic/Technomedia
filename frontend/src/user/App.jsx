import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Subheader from "./components/Subheader";
import "./App.css";

function App() {
  return (
    <div>
      <div className="headers">
        <Header />
        <Subheader />
      </div>
      <ToastContainer />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
