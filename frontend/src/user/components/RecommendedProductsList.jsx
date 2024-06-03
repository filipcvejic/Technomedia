import ProductItem from "./ProductItem";
import Loader from "../../shared/components/Loader";
import "./RecommendedProductsList.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

function RecommendedProductsList({ recommendedProducts }) {
  return (
    <>
      <div className="recommended-products-container">
        <h1 className="recommended-products-title">Recommended products</h1>
        {recommendedProducts ? (
          <>
            <div className="recommended-products">
              {recommendedProducts?.map((product) => (
                <ProductItem data={product} key={product._id} />
              ))}
            </div>
            <div className="mobile-recommended-products">
              <Swiper spaceBetween={28} slidesPerView="auto">
                {recommendedProducts.map((product) => (
                  <SwiperSlide key={product._id}>
                    <ProductItem data={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default RecommendedProductsList;
