import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseProductQuantity,
  removeFromCart,
} from "../features/cart/cartApi";
import {
  addToCartForGuest,
  decreaseProductQuantityForGuest,
  removeFromCartForGuest,
} from "../features/cart/cartSlice";

export function useCartActions() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userAuth);

  const addToCartHandler = (product) => {
    console.log(product.slug);

    dispatch(
      userInfo
        ? addToCart({
            product: product?._id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            category: product.category?._id,
            subcategory: product.subcategory?._id,
            group: product.group?._id,
            brand: product.brand?._id,
            slug: product.slug,
          })
        : addToCartForGuest({
            product: {
              _id: product._id,
              name: product.name,
              description: product.description,
              price: product.price,
              images: product.images,
              category: product.category,
              subcategory: product.subcategory,
              group: product.group,
              brand: product.brand,
              slug: product.slug,
            },
          })
    );
  };

  const decreaseProductQuantityHandler = (productId) => {
    dispatch(
      userInfo
        ? decreaseProductQuantity({ productId })
        : decreaseProductQuantityForGuest({ productId })
    );
  };

  const removeFromCartHandler = (productId) => {
    dispatch(
      userInfo
        ? removeFromCart({ productId })
        : removeFromCartForGuest({ productId })
    );
  };

  return {
    addToCart: addToCartHandler,
    decreaseProductQuantity: decreaseProductQuantityHandler,
    removeFromCart: removeFromCartHandler,
  };
}
