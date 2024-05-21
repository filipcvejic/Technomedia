import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  moveAllToCart,
  removeFromWishList,
} from "../features/wishList/wishListApi";

export function useWishListActions() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userAuth);

  if (!userInfo) {
    return {
      addToWishList: () => {},
      removeFromWishList: () => {},
      moveAllToCart: () => {},
    };
  }

  const addToWishListHandler = (product) => {
    dispatch(
      addToWishList({
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
    );
  };

  const removeFromWishListHandler = (productId) => {
    dispatch(removeFromWishList({ productId }));
  };

  const moveAllToCartHandler = (products) => {
    const adjustedProducts = products.map((product) => product._id);

    console.log(adjustedProducts);

    dispatch(moveAllToCart(adjustedProducts));
  };

  return {
    addToWishList: addToWishListHandler,
    removeFromWishList: removeFromWishListHandler,
    moveAllToCart: moveAllToCartHandler,
  };
}
