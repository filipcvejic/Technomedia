import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./AdminHomeScreen.css";
import { addToCart } from "../features/cart/cartApi";
import { useDispatch, useSelector } from "react-redux";

function AdminHomeScreen() {
  return <div className="homepage">Admin main</div>;
}

export default AdminHomeScreen;
