import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import store from "./app/store.js";
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
import AddProductScreen from "./admin/screens/AddProductScreen.jsx";
import UniversalRouteWrapper from "./user/components/UniversalRouteWrapper.jsx";
import CartScreen from "./user/screens/CartScreen.jsx";
import { ProductsProvider } from "./user/context/products-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<UniversalRouteWrapper />}>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route
                  path="/forgotpassword"
                  element={<ForgotPasswordScreen />}
                />
                <Route
                  path="/resetpassword/:id/:token"
                  element={<ResetPasswordScreen />}
                />
                <Route
                  path="/users/:id/verify/:token"
                  element={<EmailVerify />}
                />
                <Route path="" element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/SSO/success" element={<GoogleLoginSuccess />} />
                </Route>
              </Route>
            </Route>

            <Route path="/" element={<AdminApp />}>
              <Route path="/admin/login" element={<AdminLoginScreen />} />
              <Route path="" element={<AdminPrivateRoute />}>
                <Route path="/admin" element={<AdminHomeScreen />} />
                <Route
                  path="/admin/add-product"
                  element={<AddProductScreen />}
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ProductsProvider>
    </Provider>
  </React.StrictMode>
);
