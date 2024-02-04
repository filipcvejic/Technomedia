import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useState } from "react";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <header className="header">
        <div>
          <a href="/" className="home-link">
            Technomedia
          </a>
        </div>
        <div className="search-container">
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
            className="user-menu"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
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
            {isExpanded && (
              <div className="user-dropdown-menu">
                <ul>
                  <li>
                    <a href="/profile">My user account</a>
                  </li>
                  <li>
                    <a href="/cart">My cart</a>
                  </li>
                  {userInfo ? (
                    <li>
                      <button className="logout-button" onClick={logoutHandler}>
                        <span>Logout</span>
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <a href="/register">Create a user account</a>
                      </li>
                      <li>
                        <a href="/login">Login</a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="shopping-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="white"
              className="bi bi-cart-icon"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <span className="cart-counter">2</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
