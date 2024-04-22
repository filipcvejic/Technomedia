import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminNavMenu from "./components/AdminNavMenu";
import "./AdminApp.css";

function AdminApp() {
  return (
    <>
      <AdminHeader />
      <ToastContainer />
      <div className="admin-main-wrapper">
        <AdminNavMenu />
        <Outlet />
      </div>
    </>
  );
}

export default AdminApp;
