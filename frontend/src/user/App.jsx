import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Subheader from "./components/Subheader";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/records`);
    const data = await response.json();
    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="content">
      <div className="headers">
        <Header records={records} fetchRecords={fetchRecords} />
        <Subheader records={records} fetchRecords={fetchRecords} />
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
