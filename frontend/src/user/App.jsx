import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
