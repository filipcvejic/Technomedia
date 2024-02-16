import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminToolbar from "./components/AdminToolbar";

function AdminApp() {
  return (
    <>
      <AdminHeader />
      <AdminToolbar />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminApp;
