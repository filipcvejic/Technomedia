import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import GoogleLoginSuccess from "./components/GoogleLoginSuccess.jsx";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen.jsx";
import ResetPasswordScreen from "./screens/ResetPasswordScreen.jsx";
import EmailVerify from "./components/EmailVerify.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
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
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
);
