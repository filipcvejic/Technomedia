import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { toast } from "react-toastify";
import { logout } from "../features/auth/userAuthSlice";
import { useRef, useState } from "react";
import { clearGuestCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import SearchBar from "./SearchBar";
import outsideClickHandler from "../utils/outsideClickHandler";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.userCart);

  const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const userMenuRef = useRef(null);
  const cartButtonRef = useRef(null);

  const dispatch = useDispatch();

  outsideClickHandler(userMenuRef, () => setIsUserMenuExpanded(false));

  const outsideCartClickHandler = (cartRef) => {
    outsideClickHandler([cartRef, cartButtonRef], () =>
      setIsCartExpanded(false)
    );
  };

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
              <svg
                width="281"
                height="41"
                viewBox="0 0 281 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.05 37.8C15.05 39.7667 13.1333 40.75 9.3 40.75C8.46667 40.75 7.96667 40.3333 7.8 39.5C7.66667 38.6333 7.6 37.5667 7.6 36.3C7.6 35.0333 7.68333 33.6833 7.85 32.25C8.05 30.7833 8.3 29.2 8.6 27.5C9.16667 24.2333 9.96667 20.7167 11 16.95C12.0667 13.15 13.1167 10.2167 14.15 8.15C12.05 8.28333 9.96667 8.66667 7.9 9.3C5.83333 9.9 4.36667 10.3333 3.5 10.6C2.63333 10.8333 1.91667 10.95 1.35 10.95C0.783333 10.95 0.5 10.7667 0.5 10.4C0.5 9.96667 0.833333 9.33333 1.5 8.5C2.16667 7.63333 3.11667 6.76667 4.35 5.9C7.48333 3.76666 10.9667 2.68333 14.8 2.65L31.25 2.8C32.15 2.8 32.6 3.15 32.6 3.85C32.6 4.05 32.4667 4.41667 32.2 4.95C31.9333 5.45 31.7 6 31.5 6.6C31.0667 7.8 30.15 8.4 28.75 8.4C27.3833 8.4 24.1 8.3 18.9 8.1C18.7667 9.56667 18.5 11.45 18.1 13.75C17.7 16.0167 17.2667 18.5 16.8 21.2C15.6667 28.1 15.0833 33.6333 15.05 37.8ZM37.2477 34.55C39.8477 34.55 42.3643 33.5167 44.7977 31.45C45.6977 30.6833 46.431 29.9833 46.9977 29.35C47.5643 28.6833 47.9977 28.35 48.2977 28.35C48.7643 28.35 48.9977 28.8167 48.9977 29.75C48.9977 30.6833 48.7477 31.7333 48.2477 32.9C47.7477 34.0333 46.9143 35.15 45.7477 36.25C42.881 38.95 38.9477 40.3 33.9477 40.3C29.981 40.3 27.281 38.8667 25.8477 36C25.3477 35 25.0977 33.5667 25.0977 31.7C25.0977 29.8333 25.4643 27.9 26.1977 25.9C26.931 23.8667 27.8977 22.1167 29.0977 20.65C30.331 19.1833 31.7477 18.05 33.3477 17.25C34.9477 16.4167 36.6477 16 38.4477 16C40.281 16 41.681 16.45 42.6477 17.35C43.6477 18.25 44.1477 19.4167 44.1477 20.85C44.1477 22.2833 43.781 23.4667 43.0477 24.4C42.3477 25.3 41.431 26.0667 40.2977 26.7C39.1643 27.3 37.8977 27.85 36.4977 28.35C35.131 28.8167 33.781 29.35 32.4477 29.95V31.2C32.481 32.4 32.981 33.25 33.9477 33.75C34.9143 34.25 36.0143 34.5167 37.2477 34.55ZM36.3977 20.45C34.6643 20.45 33.4643 22.4667 32.7977 26.5C33.4977 26.0333 34.1477 25.6167 34.7477 25.25C35.381 24.8833 35.931 24.5333 36.3977 24.2C37.3977 23.4667 37.9143 22.6333 37.9477 21.7C37.9477 20.8667 37.431 20.45 36.3977 20.45ZM66.3461 28.2C66.9461 28.2 67.2461 28.7167 67.2461 29.75C67.2461 30.75 66.9794 31.8333 66.4461 33C65.9461 34.1667 65.1628 35.3 64.0961 36.4C63.0628 37.4667 61.7294 38.3833 60.0961 39.15C58.4628 39.9167 56.5294 40.3 54.2961 40.3C52.0961 40.3 50.1628 39.65 48.4961 38.35C46.8294 37.0167 45.9961 35.1167 45.9961 32.65C45.9961 30.15 46.3794 27.9 47.1461 25.9C47.9461 23.8667 48.9794 22.1167 50.2461 20.65C51.5461 19.1833 53.0128 18.05 54.6461 17.25C56.2794 16.4167 57.8294 16 59.2961 16C61.8628 16 63.1461 17.0167 63.1461 19.05C63.1461 20.2167 62.8961 21.15 62.3961 21.85C61.9294 22.55 61.4461 22.9 60.9461 22.9C60.2794 22.9 59.6961 22.6667 59.1961 22.2C58.6961 21.7333 58.1461 21.5 57.5461 21.5C56.9461 21.4667 56.3628 21.75 55.7961 22.35C55.2628 22.95 54.8128 23.7167 54.4461 24.65C53.7128 26.5167 53.3461 28.7 53.3461 31.2C53.3794 32.4 53.9294 33.3 54.9961 33.9C55.7294 34.3 56.5961 34.5167 57.5961 34.55C58.5961 34.55 59.5461 34.2167 60.4461 33.55C61.3794 32.8833 62.2294 32.1667 62.9961 31.4C63.7628 30.6 64.4294 29.8667 64.9961 29.2C65.5961 28.5333 66.0461 28.2 66.3461 28.2ZM81.4078 23.2C81.4078 22 80.6911 21.4 79.2578 21.4C77.8578 21.4 76.4745 22.5 75.1078 24.7C73.7411 26.8667 72.8911 29.0833 72.5578 31.35C72.6245 32.1167 72.6911 32.8833 72.7578 33.65C72.8245 34.4167 72.8578 35.1667 72.8578 35.9C72.8578 37.6667 72.2745 38.8667 71.1078 39.5C70.5745 39.8 70.0578 40.0833 69.5578 40.35C69.0911 40.6167 68.5411 40.75 67.9078 40.75C67.2745 40.75 66.7078 40.3333 66.2078 39.5C65.7411 38.6333 65.5078 37.3 65.5078 35.5C65.5078 30.4667 65.8745 26.1 66.6078 22.4C67.7411 16.6667 69.9911 10.5333 73.3578 4C73.8245 3.1 74.5078 2.66666 75.4078 2.7C76.3078 2.7 77.0411 3.31666 77.6078 4.55C78.1745 5.78333 78.4411 6.81666 78.4078 7.65C78.4078 8.48333 78.2745 9.3 78.0078 10.1C77.7745 10.8667 77.4578 11.6333 77.0578 12.4C76.6911 13.1333 76.2578 13.9 75.7578 14.7C75.2911 15.4667 74.8245 16.3 74.3578 17.2L73.6078 20.8C74.9078 18.6333 76.6578 17.1833 78.8578 16.45C79.6578 16.1833 80.5411 16.05 81.5078 16.05C83.7745 16.05 85.4911 16.5667 86.6578 17.6C87.8245 18.6 88.4078 20.0333 88.4078 21.9C88.4078 23.7333 88.1578 25.6 87.6578 27.5C87.1911 29.4 86.8411 30.7667 86.6078 31.6C86.4078 32.4 86.3078 33.0667 86.3078 33.6C86.3078 34.1333 86.4911 34.4 86.8578 34.4C87.3578 34.4 87.9745 34.0833 88.7078 33.45C89.4411 32.8167 90.1745 32.1333 90.9078 31.4C91.6411 30.6333 92.3078 29.9333 92.9078 29.3C93.5411 28.6667 93.9745 28.35 94.2078 28.35C94.6745 28.35 94.9078 28.9167 94.9078 30.05C94.9078 32.3833 93.7578 34.6333 91.4578 36.8C87.5911 39.0667 85.1245 40.2 84.0578 40.2C83.9578 40.2 83.8911 40.1833 83.8578 40.15C81.1911 40.15 79.8578 38.0167 79.8578 33.75C79.8578 31.9167 80.0245 30.2333 80.3578 28.7C80.7245 27.1667 80.9911 26.05 81.1578 25.35C81.3245 24.65 81.4078 23.9333 81.4078 23.2ZM99.0445 15.05C100.245 15.05 101.378 16.2 102.445 18.5C104.011 16.8667 105.945 16.05 108.245 16.05C110.578 16.05 112.328 16.5667 113.495 17.6C114.661 18.6 115.245 20.0333 115.245 21.9C115.245 23.7333 114.995 25.6 114.495 27.5C114.028 29.4 113.678 30.7667 113.445 31.6C113.245 32.4 113.145 33.0667 113.145 33.6C113.145 34.1333 113.328 34.4 113.695 34.4C114.195 34.4 114.811 34.0833 115.545 33.45C116.278 32.8167 117.011 32.1333 117.745 31.4C118.478 30.6333 119.145 29.9333 119.745 29.3C120.378 28.6667 120.811 28.35 121.045 28.35C121.511 28.35 121.745 28.9167 121.745 30.05C121.745 32.3833 120.595 34.6333 118.295 36.8C114.428 39.0667 111.961 40.2 110.895 40.2C110.795 40.2 110.728 40.1833 110.695 40.15C108.028 40.15 106.695 38.0167 106.695 33.75C106.695 31.9167 106.861 30.2333 107.195 28.7C107.561 27.1667 107.828 26.05 107.995 25.35C108.161 24.65 108.245 23.9333 108.245 23.2C108.245 22 107.545 21.4 106.145 21.4C104.778 21.4 103.461 22.4333 102.195 24.5C100.961 26.5333 100.128 28.65 99.6945 30.85V31.2C99.6945 32.3333 99.8612 33.5 100.195 34.7C100.561 35.9 100.745 36.7333 100.745 37.2C100.745 38.3333 99.3279 39.45 96.4945 40.55C96.0612 40.7167 95.6779 40.8 95.3445 40.8C94.5112 40.8 93.9279 40.3667 93.5945 39.5C93.2945 38.6333 93.1445 37.2833 93.1445 35.45C93.1445 30.7167 93.3279 27.3 93.6945 25.2C94.1945 22.0667 95.3279 19.15 97.0945 16.45C97.6945 15.5167 98.3445 15.05 99.0445 15.05ZM139.45 35.75C136.817 38.85 133.65 40.4 129.95 40.4C126.283 40.4 123.533 39.4667 121.7 37.6C119.867 35.7 118.967 33.35 119 30.55C118.967 26.5833 120.217 23.1667 122.75 20.3C125.283 17.4333 128.6 16 132.7 16C134.567 16 136.067 16.2333 137.2 16.7C139.167 17.5 140.15 18.25 140.15 18.95C140.15 19.4833 138.767 19.7667 136 19.8C133.267 19.8 130.967 20.75 129.1 22.65C127.267 24.5167 126.35 26.8833 126.35 29.75C126.35 31.25 126.783 32.5167 127.65 33.55C128.55 34.55 129.8 35.05 131.4 35.05C133.033 35.05 134.383 34.7167 135.45 34.05C133.083 32.45 131.9 30.1333 131.9 27.1C131.867 25.5 132.433 24.05 133.6 22.75C134.8 21.4167 136.317 20.75 138.15 20.75C140.017 20.7167 141.35 21.2167 142.15 22.25C142.95 23.2833 143.35 24.6167 143.35 26.25C143.35 27.85 142.967 29.55 142.2 31.35H142.5C143.967 31.3167 145.233 30.8 146.3 29.8C146.7 29.4 147.033 29.05 147.3 28.75C147.6 28.45 147.9 28.3 148.2 28.3C148.667 28.3 148.9 28.85 148.9 29.95C148.9 31.9833 148.3 33.5167 147.1 34.55C145.9 35.55 144.567 36.05 143.1 36.05C141.667 36.05 140.45 35.95 139.45 35.75ZM139 29.95C139.567 28.75 139.85 27.5833 139.85 26.45C139.85 25.3167 139.483 24.75 138.75 24.75C138.45 24.75 138.2 24.9667 138 25.4C137.8 25.8333 137.7 26.25 137.7 26.65C137.7 27.9833 138.133 29.0833 139 29.95ZM173.798 24.8C173.798 23.7 173.165 23.15 171.898 23.15C171.032 23.15 170.065 24 168.998 25.7C167.932 27.3667 167.165 29.1667 166.698 31.1V31.2C166.698 32.3333 166.865 33.5 167.198 34.7C167.565 35.9 167.748 36.7333 167.748 37.2C167.748 38.3333 166.332 39.45 163.498 40.55C163.065 40.7167 162.682 40.8 162.348 40.8C161.515 40.8 160.932 40.3667 160.598 39.5C160.298 38.6333 160.148 37.4667 160.148 36C160.148 34.5 160.182 33.1 160.248 31.8C160.348 30.4667 160.432 29.25 160.498 28.15C160.598 27.0167 160.682 26.0333 160.748 25.2C160.848 24.3333 160.898 23.6333 160.898 23.1C160.898 21.9667 160.382 21.4 159.348 21.4C158.315 21.4 157.115 22.6167 155.748 25.05C154.382 27.45 153.698 29.3667 153.698 30.8C153.698 32.2 153.865 33.5 154.198 34.7C154.565 35.9 154.748 36.7333 154.748 37.2C154.748 38.3333 153.332 39.45 150.498 40.55C150.065 40.7167 149.682 40.8 149.348 40.8C148.515 40.8 147.932 40.3667 147.598 39.5C147.298 38.6333 147.148 37.3 147.148 35.5C147.148 30.7667 147.332 27.35 147.698 25.25C148.198 22.15 149.332 19.2167 151.098 16.45C151.698 15.5167 152.348 15.05 153.048 15.05C154.148 15.05 155.165 15.95 156.098 17.75C156.365 18.2167 156.565 18.65 156.698 19.05C158.298 17.05 160.182 16.05 162.348 16.05C163.782 16.05 165.065 16.5333 166.198 17.5C167.332 18.4333 167.898 19.6167 167.898 21.05V21.6C169.932 19.0667 172.415 17.8 175.348 17.8C177.148 17.8 178.515 18.2667 179.448 19.2C180.382 20.1333 180.848 21.2833 180.848 22.65C180.848 24.0167 180.748 25.25 180.548 26.35C180.348 27.45 180.115 28.4833 179.848 29.45C179.615 30.4167 179.398 31.2833 179.198 32.05C178.998 32.7833 178.898 33.3667 178.898 33.8C178.898 34.2 179.032 34.4 179.298 34.4C179.798 34.4 180.415 34.0833 181.148 33.45C181.882 32.8167 182.615 32.1333 183.348 31.4C184.082 30.6333 184.748 29.9333 185.348 29.3C185.982 28.6667 186.415 28.35 186.648 28.35C187.115 28.35 187.348 28.9167 187.348 30.05C187.348 32.3833 186.165 34.65 183.798 36.85C181.465 39.05 178.965 40.15 176.298 40.15C173.898 40.15 172.698 37.9667 172.698 33.6C172.698 32.5 172.882 30.9833 173.248 29.05C173.615 27.1167 173.798 25.7 173.798 24.8ZM196.476 34.55C199.076 34.55 201.593 33.5167 204.026 31.45C204.926 30.6833 205.66 29.9833 206.226 29.35C206.793 28.6833 207.226 28.35 207.526 28.35C207.993 28.35 208.226 28.8167 208.226 29.75C208.226 30.6833 207.976 31.7333 207.476 32.9C206.976 34.0333 206.143 35.15 204.976 36.25C202.11 38.95 198.176 40.3 193.176 40.3C189.21 40.3 186.51 38.8667 185.076 36C184.576 35 184.326 33.5667 184.326 31.7C184.326 29.8333 184.693 27.9 185.426 25.9C186.16 23.8667 187.126 22.1167 188.326 20.65C189.56 19.1833 190.976 18.05 192.576 17.25C194.176 16.4167 195.876 16 197.676 16C199.51 16 200.91 16.45 201.876 17.35C202.876 18.25 203.376 19.4167 203.376 20.85C203.376 22.2833 203.01 23.4667 202.276 24.4C201.576 25.3 200.66 26.0667 199.526 26.7C198.393 27.3 197.126 27.85 195.726 28.35C194.36 28.8167 193.01 29.35 191.676 29.95V31.2C191.71 32.4 192.21 33.25 193.176 33.75C194.143 34.25 195.243 34.5167 196.476 34.55ZM195.626 20.45C193.893 20.45 192.693 22.4667 192.026 26.5C192.726 26.0333 193.376 25.6167 193.976 25.25C194.61 24.8833 195.16 24.5333 195.626 24.2C196.626 23.4667 197.143 22.6333 197.176 21.7C197.176 20.8667 196.66 20.45 195.626 20.45ZM236.425 28.2C237.025 28.2 237.325 28.9667 237.325 30.5C237.325 31.3333 236.975 32.35 236.275 33.55C235.575 34.7167 234.658 35.8 233.525 36.8C232.425 37.7667 231.191 38.5667 229.825 39.2C228.458 39.8333 227.125 40.15 225.825 40.15C223.991 40.15 222.791 38.65 222.225 35.65C220.225 38.8167 217.258 40.4 213.325 40.4C210.925 40.4 209.008 39.6667 207.575 38.2C206.141 36.7333 205.441 34.95 205.475 32.85C205.475 27.1833 207.358 22.7167 211.125 19.45C213.725 17.2167 216.425 16.1 219.225 16.1C220.491 16.1 221.491 16.2 222.225 16.4L223.375 16.7C224.741 10.2667 226.325 5.96666 228.125 3.8C228.725 3.06666 229.325 2.7 229.925 2.7C230.891 2.7 231.791 3.36666 232.625 4.7C233.358 5.8 233.725 6.75 233.725 7.55C233.725 8.35 233.608 9.13333 233.375 9.9C233.141 10.6667 232.841 11.3833 232.475 12.05C232.141 12.6833 231.758 13.3167 231.325 13.95C230.891 14.55 230.458 15.1667 230.025 15.8C229.058 19.4 228.341 23.4333 227.875 27.9C227.741 29.1667 227.675 30.1833 227.675 30.95C227.675 33.25 228.058 34.4 228.825 34.4C229.691 34.4 231.791 32.6667 235.125 29.2C235.725 28.5333 236.158 28.2 236.425 28.2ZM212.825 31.2C212.825 33.7667 213.775 35.05 215.675 35.05C216.808 35.05 217.941 34.6167 219.075 33.75C220.241 32.8833 221.141 31.4333 221.775 29.4C221.841 26.4 222.191 23.1 222.825 19.5C220.158 20.0333 217.825 21.3333 215.825 23.4C213.825 25.4667 212.825 28.0667 212.825 31.2ZM240.826 40.15C237.493 40.15 235.826 37.0333 235.826 30.8C235.826 27.4 236.243 24.3167 237.076 21.55C238.376 17.2833 239.843 15.15 241.476 15.15C242.443 15.15 243.21 15.8 243.776 17.1C244.243 18.1 244.46 19.0833 244.426 20.05C244.426 21.3833 244.026 23.7333 243.226 27.1C242.46 30.0333 242.076 31.85 242.076 32.55C242.076 33.25 242.243 33.7333 242.576 34C242.943 34.2667 243.36 34.4 243.826 34.4C244.326 34.4 244.943 34.0833 245.676 33.45C246.41 32.8167 247.143 32.1333 247.876 31.4C248.61 30.6333 249.276 29.9333 249.876 29.3C250.51 28.6667 250.943 28.35 251.176 28.35C251.643 28.35 251.876 28.9167 251.876 30.05C251.876 32.3833 250.693 34.6667 248.326 36.9C245.993 39.1 243.493 40.1833 240.826 40.15ZM242.876 11.1C241.976 9.76667 241.526 8.33333 241.526 6.8C241.526 5.26666 241.76 4 242.226 3C242.726 1.96667 243.193 1.21667 243.626 0.749999C244.06 0.249999 244.56 -5.96046e-07 245.126 -5.96046e-07C246.06 -5.96046e-07 246.91 0.699999 247.676 2.1C248.443 3.46667 248.826 4.61667 248.826 5.55C248.826 7.28333 248.21 8.65 246.976 9.65C245.776 10.6167 244.41 11.1 242.876 11.1ZM280.077 28.2C280.677 28.2 280.977 28.9667 280.977 30.5C280.977 31.3333 280.627 32.35 279.927 33.55C279.227 34.7167 278.31 35.8 277.177 36.8C276.077 37.7667 274.844 38.5667 273.477 39.2C272.11 39.8333 270.777 40.15 269.477 40.15C267.71 40.15 266.527 38.6 265.927 35.5C265.06 36.9333 263.927 38.1167 262.527 39.05C261.127 39.95 259.244 40.4 256.877 40.4C254.544 40.4 252.66 39.6667 251.227 38.2C249.794 36.7333 249.094 34.95 249.127 32.85C249.127 27.1833 251.01 22.7167 254.777 19.45C256.377 18.0833 257.86 17.1833 259.227 16.75C260.627 16.3167 262.094 16.1 263.627 16.1C265.16 16.1 266.41 16.3667 267.377 16.9C267.844 15.9333 268.377 15.45 268.977 15.45C270.144 15.45 271.244 15.9667 272.277 17C273.344 18 273.877 18.95 273.877 19.85C273.41 20.95 272.727 22.2667 271.827 23.8C271.56 25.3333 271.427 27.4833 271.427 30.25C271.427 33.0167 271.777 34.4 272.477 34.4C273.344 34.4 275.444 32.6667 278.777 29.2C279.377 28.5333 279.81 28.2 280.077 28.2ZM256.477 31.2C256.477 33.7667 257.427 35.05 259.327 35.05C261.36 35.0167 263.044 33.9333 264.377 31.8C264.844 31.0667 265.227 30.1667 265.527 29.1C265.527 25.3667 265.86 22.1667 266.527 19.5C263.827 20.0333 261.477 21.3333 259.477 23.4C257.477 25.4667 256.477 28.0667 256.477 31.2Z"
                  fill="white"
                />
              </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 256 256"
                    version="1.1"
                  >
                    <path
                      d="M 109.230 2.015 C 89.255 7.249, 71.745 21.396, 61.951 40.213 C 56.320 51.033, 54 60.891, 54 74 C 54 94.943, 61.278 112.426, 76.054 126.973 L 81.782 132.613 74.641 134.405 C 64.447 136.962, 48.813 143.315, 39.500 148.683 C 23.177 158.093, 12.392 168.299, 6.581 179.840 C 1.227 190.471, 0.032 196.999, 0.015 215.712 C -0.004 235.967, 1.283 240.316, 9.517 247.841 C 19.073 256.575, 10.721 256, 128 256 C 244.515 256, 236.900 256.492, 245.916 248.386 C 248.626 245.949, 251.811 241.828, 252.993 239.228 C 254.176 236.628, 255.561 233.719, 256.072 232.764 C 257.264 230.533, 257.303 196.695, 256.112 197.431 C 255.624 197.733, 254.928 196.005, 254.566 193.592 C 252.697 181.125, 241.036 165.114, 226.516 155.076 C 217.619 148.926, 204.136 142, 201.058 142 C 195.518 142, 191.044 146.691, 191.044 152.500 C 191.044 157.905, 192.928 159.879, 203.243 165.288 C 219.741 173.939, 228.855 182.671, 233.052 193.847 C 236.009 201.721, 237.010 223.715, 234.665 229.286 C 231.689 236.358, 237.376 236, 128 236 C 18.624 236, 24.311 236.358, 21.335 229.286 C 18.972 223.672, 19.992 201.720, 22.985 193.748 C 27.220 182.470, 36.753 173.462, 53.732 164.693 C 72.604 154.945, 90.822 150.644, 122.288 148.505 C 145.550 146.923, 151.038 145.717, 162.583 139.649 C 176.709 132.225, 187.196 121.358, 194.575 106.500 C 199.984 95.606, 201.960 86.784, 201.983 73.410 C 202.004 60.937, 199.601 50.881, 194.049 40.213 C 184.157 21.208, 166.632 7.149, 146.377 1.968 C 136.092 -0.662, 119.367 -0.641, 109.230 2.015 M 120 21.040 C 104.740 23.392, 91.519 32.065, 82.827 45.428 C 71.857 62.290, 71.871 85.823, 82.860 102.572 C 93.536 118.845, 108.852 127.202, 128 127.202 C 147.148 127.202, 162.464 118.845, 173.140 102.572 C 184.143 85.802, 184.143 62.198, 173.140 45.428 C 161.262 27.323, 140.640 17.859, 120 21.040 M 0.413 215.500 C 0.414 225.400, 0.564 229.315, 0.746 224.199 C 0.928 219.084, 0.927 210.984, 0.744 206.199 C 0.561 201.415, 0.412 205.600, 0.413 215.500"
                      stroke="none"
                      fill="#fffcfc"
                      fillRule="evenodd"
                      className="bi-user-icon"
                    />
                    <path
                      d=""
                      stroke="none"
                      fill="#fcfcfc"
                      fillRule="evenodd"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 256 256"
                    version="1.1"
                  >
                    <path
                      d="M 109.230 2.015 C 89.255 7.249, 71.745 21.396, 61.951 40.213 C 56.320 51.033, 54 60.891, 54 74 C 54 94.943, 61.278 112.426, 76.054 126.973 L 81.782 132.613 74.641 134.405 C 64.447 136.962, 48.813 143.315, 39.500 148.683 C 23.177 158.093, 12.392 168.299, 6.581 179.840 C 1.227 190.471, 0.032 196.999, 0.015 215.712 C -0.004 235.967, 1.283 240.316, 9.517 247.841 C 19.073 256.575, 10.721 256, 128 256 C 244.515 256, 236.900 256.492, 245.916 248.386 C 248.626 245.949, 251.811 241.828, 252.993 239.228 C 254.176 236.628, 255.561 233.719, 256.072 232.764 C 257.264 230.533, 257.303 196.695, 256.112 197.431 C 255.624 197.733, 254.928 196.005, 254.566 193.592 C 252.697 181.125, 241.036 165.114, 226.516 155.076 C 217.619 148.926, 204.136 142, 201.058 142 C 195.518 142, 191.044 146.691, 191.044 152.500 C 191.044 157.905, 192.928 159.879, 203.243 165.288 C 219.741 173.939, 228.855 182.671, 233.052 193.847 C 236.009 201.721, 237.010 223.715, 234.665 229.286 C 231.689 236.358, 237.376 236, 128 236 C 18.624 236, 24.311 236.358, 21.335 229.286 C 18.972 223.672, 19.992 201.720, 22.985 193.748 C 27.220 182.470, 36.753 173.462, 53.732 164.693 C 72.604 154.945, 90.822 150.644, 122.288 148.505 C 145.550 146.923, 151.038 145.717, 162.583 139.649 C 176.709 132.225, 187.196 121.358, 194.575 106.500 C 199.984 95.606, 201.960 86.784, 201.983 73.410 C 202.004 60.937, 199.601 50.881, 194.049 40.213 C 184.157 21.208, 166.632 7.149, 146.377 1.968 C 136.092 -0.662, 119.367 -0.641, 109.230 2.015 M 120 21.040 C 104.740 23.392, 91.519 32.065, 82.827 45.428 C 71.857 62.290, 71.871 85.823, 82.860 102.572 C 93.536 118.845, 108.852 127.202, 128 127.202 C 147.148 127.202, 162.464 118.845, 173.140 102.572 C 184.143 85.802, 184.143 62.198, 173.140 45.428 C 161.262 27.323, 140.640 17.859, 120 21.040 M 0.413 215.500 C 0.414 225.400, 0.564 229.315, 0.746 224.199 C 0.928 219.084, 0.927 210.984, 0.744 206.199 C 0.561 201.415, 0.412 205.600, 0.413 215.500"
                      stroke="none"
                      fill="#fffcfc"
                      fillRule="evenodd"
                    />
                    <path
                      d=""
                      stroke="none"
                      fill="#fcfcfc"
                      fillRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </div>
            <div className="favourite-items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 256 256"
                version="1.1"
              >
                <path
                  d="M 56.856 22.511 C 32.288 27.405, 11.820 45.379, 3.339 69.510 C 0.751 76.872, 0.532 78.640, 0.553 92 C 0.573 105.050, 0.844 107.300, 3.263 114.500 C 8.166 129.098, 13.575 136.834, 30.877 154 C 56.117 179.041, 119.625 233.319, 125.088 234.519 C 126.689 234.871, 129.311 234.871, 130.912 234.519 C 138.601 232.831, 227.729 154.406, 239.924 138.599 C 245.693 131.121, 251.344 119.771, 253.416 111.500 C 254.381 107.650, 255.582 103.719, 256.085 102.764 C 257.363 100.338, 257.284 79.706, 256 80.500 C 255.450 80.840, 255 80.158, 255 78.985 C 255 75.229, 249.966 61.706, 246.356 55.764 C 230.912 30.339, 200.765 16.846, 171.838 22.412 C 156.944 25.278, 145.389 31.391, 134.279 42.285 L 128.058 48.384 121.279 41.907 C 117.551 38.345, 112.203 33.979, 109.395 32.204 C 94.170 22.582, 74.615 18.974, 56.856 22.511 M 64.112 45.167 C 55.708 46.143, 44.939 51.315, 38.261 57.583 C 20.658 74.104, 18.355 99.703, 32.550 121.071 C 37.756 128.907, 53.735 144.595, 79 166.674 C 99.765 184.820, 127.239 207.981, 128 207.981 C 128.765 207.981, 156.335 184.735, 176.724 166.899 C 202.305 144.520, 218.268 128.871, 223.409 121.132 C 237.291 100.237, 235.560 75.400, 219.074 58.914 C 209.462 49.302, 198.416 44.811, 184.480 44.850 C 169.333 44.892, 159.258 49.897, 145 64.462 C 135.710 73.951, 132.691 76, 128 76 C 123.309 76, 120.290 73.951, 111 64.462 C 101.243 54.495, 94.741 49.928, 86.387 47.171 C 79.178 44.792, 72.510 44.193, 64.112 45.167 M 0.378 92 C 0.378 98.325, 0.541 100.912, 0.739 97.750 C 0.937 94.587, 0.937 89.412, 0.739 86.250 C 0.541 83.087, 0.378 85.675, 0.378 92"
                  stroke="none"
                  fill="#fffcfc"
                  fillRule="evenodd"
                  className="bi-favourite-icon"
                />
                <path d="" stroke="none" fill="#fcfcfc" fillRule="evenodd" />
              </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 256 256"
                  version="1.1"
                >
                  <path
                    d="M 4.528 12.272 C 1.803 14.997, 1 16.616, 1 19.384 C 1 24.804, 4.823 28.068, 18.207 34.076 C 24.645 36.966, 30.166 39.990, 30.475 40.796 C 30.784 41.601, 36.922 67.964, 44.115 99.380 C 51.309 130.796, 58.107 158.641, 59.223 161.257 C 61.507 166.610, 66.396 171.367, 72.435 174.110 C 76.261 175.847, 80.562 175.957, 145.500 175.968 L 214.500 175.980 219.500 173.647 C 224.932 171.112, 230.850 165.241, 232.760 160.493 C 235.355 154.040, 254.999 66.666, 254.978 61.671 C 254.939 52.418, 249.480 43.875, 240.620 39.201 L 235.500 36.500 157.500 36.236 C 84.650 35.989, 79.269 36.088, 76 37.736 C 71.042 40.235, 69.238 45.789, 71.732 50.876 C 72.704 52.861, 74.625 55.044, 76 55.727 C 77.926 56.685, 95.991 56.974, 154.679 56.985 C 238.882 57.002, 234.078 56.617, 233.930 63.321 C 233.891 65.070, 229.278 86.062, 223.680 109.972 C 214.173 150.567, 213.335 153.527, 211 154.707 C 209.066 155.685, 194.313 155.974, 145.797 155.985 C 81.405 156, 78.668 155.844, 77.570 152.098 C 77.312 151.219, 71.201 124.625, 63.989 93 C 56.777 61.375, 49.969 33.598, 48.860 31.273 C 47.751 28.949, 45.417 25.834, 43.672 24.352 C 39.441 20.757, 16.469 9.877, 11.778 9.245 C 8.527 8.808, 7.609 9.191, 4.528 12.272 M 93.479 196.752 C 83.770 200.205, 78.489 206.055, 75.973 216.146 C 71.149 235.494, 92.872 253.188, 111.132 244.784 C 117.172 242.004, 122.040 237.458, 124.704 232.108 C 127.355 226.783, 127.129 214.819, 124.276 209.405 C 118.394 198.246, 104.884 192.695, 93.479 196.752 M 184.500 195.930 C 171.596 199.052, 162.978 210.811, 164.289 223.509 C 166.628 246.175, 194.666 255.059, 209.429 237.811 C 221.653 223.531, 214.975 201.931, 196.655 196.490 C 191.267 194.890, 189.195 194.795, 184.500 195.930 M 97.020 213.284 C 91.573 216.040, 90.559 222.712, 94.923 227.077 C 100.938 233.091, 110 229.519, 110 221.134 C 110 217.944, 109.404 216.677, 106.923 214.589 C 103.537 211.739, 100.789 211.377, 97.020 213.284 M 184.046 214.800 C 177.912 220.934, 181.383 230, 189.866 230 C 193.088 230, 194.321 229.407, 196.510 226.805 C 201.288 221.127, 198.270 213.567, 190.737 212.345 C 187.600 211.836, 186.669 212.177, 184.046 214.800"
                    stroke="none"
                    fill="#fffcfc"
                    fillRule="evenodd"
                    className="bi-cart-icon"
                  />
                  <path d="" stroke="none" fill="#fcfcfc" fillRule="evenodd" />
                </svg>
              </button>
              <span className="cart-counter">
                <span>{Object.keys(cart).length}</span>
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
