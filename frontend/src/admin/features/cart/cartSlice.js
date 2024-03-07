import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartApi";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
      console.log(JSON.parse(localStorage.getItem("cart")));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        const { product, quantity } = action.payload;

        const productIndex = state.cart.findIndex(
          (item) => item.product._id === product._id
        );

        if (productIndex !== -1) {
          state.cart[productIndex].quantity += quantity || 1;
        } else {
          state.cart.push({ product, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
    // .addCase(removeProductFromCart, (state, action) => {
    //   state.cart = state.cart.filter(
    //     (item) => item.product._id !== action.payload
    //   );
    //   localStorage.setItem("cart", JSON.stringify(state.cart));
    // }).addCase(decreaseProductQuantity, (state, action) => {
    //   const productIndex = state.cart.findIndex(item => item.product._id === action.payload);
    //   if (productIndex !== -1) {
    //     state.cart[productIndex].quantity -= 1;
    //     if (state.cart[productIndex].quantity === 0) {
    //       state.cart.splice(productIndex, 1);
    //     }
    //     localStorage.setItem("cart", JSON.stringify(state.cart));
    //   }
    // });;
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cart: [],
//   totalQuantity: 0,
//   totalPrice: 0,
// };

// export const cartSlice = createSlice({
//   name: "userCart",
//   initialState,
//   reducers: {
//     addToCartSuccess: (state, action) => {
//       let find = state.cart.findIndex((item) => item.id === action.payload.id);
//       if (find >= 0) {
//         state.cart[find].quantity += 1;
//       } else {
//         state.cart.push(action.payload);
//       }
//     },

//     removeFromCartSuccess: (state, action) => {
//       state.cart = state.cart.filter((item) => item.id !== action.payload);
//     },

//     getCartTotal: (state) => {
//       let { totalQuantity, totalPrice } = state.cart.reduce(
//         (cartTotal, cartItem) => {
//           const { price, quantity } = cartItem;
//           const itemTotal = price * quantity;
//           cartTotal.totalPrice += itemTotal;
//           cartTotal.totalQuantity += quantity;
//           return cartTotal;
//         },
//         {
//           totalQuantity: 0,
//           totalPrice: 0,
//         }
//       );
//       state.totalQuantity = parseInt(totalQuantity.toFixed(2));
//       state.totalPrice = totalPrice;
//     },

//     increaseItemQuantity: (state, action) => {
//       state.cart = state.cart.map((item) => {
//         if (item.id === action.payload) {
//           return { ...item, quantity: item.quantity + 1 };
//         }
//         return item;
//       });
//     },

//     decreaseItemQuantity: (state, action) => {
//       state.cart = state.cart.map((item) => {
//         if (item.id === action.payload) {
//           return { ...item, quantity: item.quantity - 1 };
//         }
//         return item;
//       });
//     },
//   },
// });

// export const {
//   addToCartSuccess,
//   removeFromCartSuccess,
//   getCartTotal,
//   increaseItemQuantity,
//   decreaseItemQuantity,
// } = cartSlice.actions;

// export default adminCartSlice.reducer;
