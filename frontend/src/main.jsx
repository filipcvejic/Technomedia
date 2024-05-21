import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
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
import UniversalRouteWrapper from "./user/components/UniversalRouteWrapper.jsx";
import CartScreen from "./user/screens/CartScreen.jsx";
import ProductScreen from "./user/screens/ProductScreen.jsx";
import ProductsGroupScreen from "./user/screens/ProductsGroupScreen.jsx";
import AdminUsersScreen from "./admin/screens/AdminUsersScreen.jsx";
import AdminProductsScreen from "./admin/screens/AdminProductsScreen.jsx";
import SearchResultsScreen from "./user/screens/SearchResultsScreen.jsx";
import ProductsCategoryScreen from "./user/screens/ProductsCategoryScreen.jsx";
import ProductsSubcategoryScreen from "./user/screens/ProductsSubcategoryScreen.jsx";
import AdminEarningsScreen from "./admin/screens/AdminEarningsScreen.jsx";
import WishListScreen from "./user/screens/WishListScreen.jsx";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/" element={<UniversalRouteWrapper />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/wish-list" element={<WishListScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/search" element={<SearchResultsScreen />} />
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route
          path="/resetpassword/:id/:token"
          element={<ResetPasswordScreen />}
        />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route
          path="/:categoryName/:subcategoryName/:groupName/:productName"
          element={<ProductScreen />}
        />
        <Route path="/:categoryName" element={<ProductsCategoryScreen />} />
        <Route
          path="/:categoryName/:subcategoryName"
          element={<ProductsSubcategoryScreen />}
        />
        <Route
          path="/:categoryName/:subcategoryName/:groupName"
          element={<ProductsGroupScreen />}
        />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/SSO/success" element={<GoogleLoginSuccess />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminApp />}>
      <Route path="/" element={<AdminPrivateRoute />}>
        <Route path="/" element={<AdminHomeScreen />} />
        <Route path="/earnings" element={<AdminEarningsScreen />} />
        <Route path="/users" element={<AdminUsersScreen />} />
        <Route path="/products" element={<AdminProductsScreen />} />
        <Route path="*" element={<Navigate to="/admin/earnings" />} />
      </Route>
    </Route>
    <Route path="/login" element={<AdminLoginScreen />} />
  </Routes>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
