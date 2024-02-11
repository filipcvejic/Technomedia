import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./user/App.jsx";
import "./index.css";
import HomeScreen from "./user/screens/HomeScreen.jsx";
import LoginScreen from "./user/screens/LoginScreen.jsx";
import RegisterScreen from "./user/screens/RegisterScreen.jsx";
import PrivateRoute from "./user/components/PrivateRoute.jsx";
import ProfileScreen from "./user/screens/ProfileScreen.jsx";
import GoogleLoginSuccess from "./user/components/GoogleLoginSuccess.jsx";
import ForgotPasswordScreen from "./user/screens/ForgotPasswordScreen.jsx";
import ResetPasswordScreen from "./user/screens/ResetPasswordScreen.jsx";
import EmailVerify from "./user/components/EmailVerify.jsx";
import AdminLoginScreen from "./admin/screens/AdminLoginScreen.jsx";
import AdminHomeScreen from "./admin/screens/AdminHomeScreen.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import AdminPrivateRoute from "./admin/components/AdminPrivateRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index={true} element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
            <Route
              path="/resetpassword/:id/:token"
              element={<ResetPasswordScreen />}
            />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/SSO/success" element={<GoogleLoginSuccess />} />
            </Route>
          </Route>
          <Route path="/" element={<AdminApp />}>
            <Route path="/admin/login" element={<AdminLoginScreen />} />
            <Route path="" element={<AdminPrivateRoute />}>
              <Route path="/admin" element={<AdminHomeScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
