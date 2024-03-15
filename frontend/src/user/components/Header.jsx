import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { toast } from "react-toastify";
import { logout } from "../features/auth/userAuthSlice";
import { useState } from "react";
import { clearGuestCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.userCart);

  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(logout());
      dispatch(clearGuestCart());
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <>
      <header className="header">
        <div className="main-header">
          <div>
            <a className="logo" href="/">
              Technomedia
            </a>
          </div>
          <div className="category-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="35"
              width="35"
              fill="white"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M20,6H4A1,1,0,1,1,4,4H20A1,1,0,0,1,20,6Z"></path>
              <path d="M20,13H4a1,1,0,0,1,0-2H20A1,1,0,0,1,20,13Z"></path>
              <path d="M20,20H4a1,1,0,0,1,0-2H20A1,1,0,0,1,20,20Z"></path>
            </svg>
            <span>Categories</span>
          </div>
          <div className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search product, category or brand"
            />
            <button type="submit" className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
          <div className="header-links">
            <div
              className="user-actions"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="40"
                fill="white"
                className="bi bi-person-icon"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <span>
                <Link to="/login">Sign in</Link>
              </span>
            </div>
            <div className="favourite-items">
              <svg
                height="40"
                width="35"
                viewBox="0 0 24 21"
                xmlns="http://www.w3.org/2000/svg"
                className="secondary_wishListIcon__3C6V1"
                focusable="false"
                role="img"
                aria-labelledby="icon_:Rnnbal6:"
                aria-hidden="false"
              >
                <path
                  d="M12 20.75a.72.72 0 0 1-.42-.13c-.32-.21-7.79-5.27-10.24-9.76C-.12 8.18-.45 4.4 2.09 2a6.48 6.48 0 0 1 8.82 0L12 3l1.08-1a6.48 6.48 0 0 1 8.82 0c2.54 2.41 2.21 6.19.75 8.87-2.45 4.49-9.9 9.55-10.22 9.76a.72.72 0 0 1-.43.12zm-5.5-19a4.89 4.89 0 0 0-3.37 1.32c-2 1.87-1.66 4.9-.47 7.07 2 3.59 7.73 7.82 9.34 9 1.6-1.14 7.36-5.36 9.32-8.95 1.28-2.34 1.54-5.68-1-7.49a5.07 5.07 0 0 0-6.32.52l-.88.84 1.45 1.4-.35.36a1 1 0 0 1-1.41 0L9.87 3.07A4.89 4.89 0 0 0 6.5 1.75z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="shopping-cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="40"
                fill="white"
                className="bi bi-cart-icon"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              <span className="cart-counter">{Object.keys(cart).length}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
