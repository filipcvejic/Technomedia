import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";

function AdminApp() {
  return (
    <>
      <AdminHeader />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminApp;
