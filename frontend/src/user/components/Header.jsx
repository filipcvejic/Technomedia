import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { toast } from "react-toastify";
import { logout } from "../features/auth/userAuthSlice";
import { useRef, useState, useEffect } from "react";
import { clearGuestCart } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import MiniCart from "./MiniCart";
import SearchBar from "./SearchBar";
import outsideClickHandler from "../utils/outsideClickHandler";
import UserIcon from "../svgs/UserIcon";
import WishListIcon from "../svgs/WishListIcon";
import CartIcon from "../svgs/CartIcon";
import Logo from "../svgs/Logo";
import { clearWishList } from "../features/wishList/wishListSlice";
import HamburgerMenuIcon from "../svgs/HamburgerMenuIcon";
import HamburgerContent from "./HamburgerContent";

const Header = ({ records, fetchRecords }) => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.userCart);

  const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);

  const userMenuRef = useRef(null);
  const cartButtonRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mediaQuery = window.matchMedia("(min-width: 1380px)");

  const handleMediaQueryChange = (e) => {
    if (e.matches) {
      setIsMobileMenuExpanded(false);
    }
  };

  useEffect(() => {
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  outsideClickHandler(userMenuRef, () => setIsUserMenuExpanded(false));

  const outsideCartClickHandler = (cartRef) => {
    outsideClickHandler([cartRef, cartButtonRef], () =>
      setIsCartExpanded(false)
    );
  };

  const closeHamburgerMenuHandler = () => {
    setIsMobileMenuExpanded(false);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(logout());
      dispatch(clearGuestCart());
      dispatch(clearWishList());
      navigate("/");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const hamburgerMenuClickHandler = () => {
    if (!isMobileMenuExpanded && records.length === 0) {
      fetchRecords();
    }

    setIsMobileMenuExpanded(true);
  };

  return (
    <>
      <header className="header">
        <div className="main-header">
          <div
            className="header-hamburger-menu"
            onClick={hamburgerMenuClickHandler}
          >
            <HamburgerMenuIcon />
          </div>
          <a className="logo" href="/">
            <Logo />
          </a>
          <div className="search-bar-wrapper">
            <SearchBar />
          </div>
          <div className="header-links">
            <div
              className="user-actions"
              ref={userMenuRef}
              onClick={(e) => {
                e.preventDefault();
                setIsUserMenuExpanded((prevValue) => !prevValue);
              }}
            >
              {userInfo ? (
                <div className="user-profile">
                  <UserIcon />
                  {isUserMenuExpanded && (
                    <div className="extended-user-menu">
                      <div className="menu-triangle" />
                      <Link to="/profile">My profile</Link>
                      <button
                        className="logout-button"
                        type="button"
                        onClick={logoutHandler}
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <UserIcon />
                </Link>
              )}
            </div>
            <div className="favourite-items">
              <Link to={`/${userInfo ? "wish-list" : "login"}`}>
                {<WishListIcon />}
              </Link>
            </div>
            <div className="shopping-cart">
              <button
                className="cart-icon-button"
                ref={cartButtonRef}
                onClick={(e) => {
                  e.preventDefault();
                  setIsCartExpanded((prevValue) => !prevValue);
                }}
              >
                <CartIcon />
              </button>
              <span className="cart-counter">
                <span>{Object.keys(cart)?.length}</span>
              </span>
              {isCartExpanded && (
                <MiniCart
                  cart={cart}
                  onOutsideClick={outsideCartClickHandler}
                />
              )}
            </div>
          </div>
          {isMobileMenuExpanded && (
            <div className="hamburger-menu-container">
              <HamburgerContent
                records={records}
                onCloseMenu={closeHamburgerMenuHandler}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
