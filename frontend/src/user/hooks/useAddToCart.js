import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartApi";

export default function useAddToCart() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userAuth);

  const addToCartHandler = (product) => {
    if (userInfo) {
      dispatch(
        addToCart({
          product: product?._id,
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          category: product.category?._id,
          subcategory: product.subcategory?._id,
          group: product.group?._id,
          brand: product.brand?._id,
        })
      );
    } else {
      dispatch(
        addToCartForGuest({
          product: {
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            category: product.category?._id,
            subcategory: product.subcategory?._id,
            group: product.group?._id,
            brand: product.brand?._id,
          },
        })
      );
    }
  };

  return addToCartHandler;
}
