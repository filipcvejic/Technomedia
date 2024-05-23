import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { toast } from "react-toastify";
import { logout } from "../features/auth/userAuthSlice";
import { useRef, useState } from "react";
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

const Header = () => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.userCart);

  const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const userMenuRef = useRef(null);
  const cartButtonRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  outsideClickHandler(userMenuRef, () => setIsUserMenuExpanded(false));

  const outsideCartClickHandler = (cartRef) => {
    outsideClickHandler([cartRef, cartButtonRef], () =>
      setIsCartExpanded(false)
    );
  };

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
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
      dispatch(clearWishList());
      navigate("/");
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
              <Logo />
            </a>
          </div>
          <SearchBar />
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
        </div>
      </header>
    </>
  );
};

export default Header;
