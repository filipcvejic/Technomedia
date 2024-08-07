import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeScreen.css";
import { toast } from "react-toastify";
import RecommendedProductsList from "../components/RecommendedProductsList";
import MostWantedCategoriesContainer from "../components/MostWantedGroupsContainer";
import HeroLogoIcon from "../svgs/HeroLogoIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MockupTimer from "../components/MockupTimer";
import { Link } from "react-router-dom";
import Loader from "../../shared/components/Loader";

const HomeScreen = () => {
  const [recommendedRecords, setRecommendedRecords] = useState([]);

  const leftImages = [
    "/images/laptop-mockup.png",
    "/images/pc-mockup.png",
    "/images/watches-mockup.png",
    "/images/phones-mockup.png",
  ];

  const mobileLeftImages = [
    "/images/laptop-mockup-2.png",
    "/images/pc-mockup-2.png",
    "/images/watches-mockup-2.png",
    "/images/phones-mockup-2.png",
  ];

  const bottomImages = [
    "/images/delivery-promotion-mockup.png",
    "/images/delivery-speed-mockup.png",
    "/images/tablets-promotion-mockup.png",
    "/images/appliances-promotion-mockup.png",
  ];

  const mobileBottomImages = [
    "/images/delivery-promotion-mockup-2.png",
    "/images/delivery-speed-mockup-2.png",
    "/images/tablets-promotion-mockup-2.png",
    "/images/appliances-promotion-mockup-2.png",
  ];

  useEffect(() => {
    const getRecommendedRecords = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/recommended-records`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setRecommendedRecords(data);
      } catch (err) {
        toast.error(err);
      }
    };

    getRecommendedRecords();
  }, []);

  return (
    <div className="homepage">
      <div className="homeslider-container">
        <div className="homeslider-hero">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
          >
            {leftImages?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mobile-homeslider-hero">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
          >
            {mobileLeftImages?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="homeslider-deal-wrapper">
          <div className="homeslider-deal-header">
            <h1>SPECIAL OFFER</h1>
            <p>Remaining until the end of the offer:</p>
            <MockupTimer />
          </div>
          <div className="homeslider-deal-content">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={0}
              navigation
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              slidesPerView={1}
            >
              {recommendedRecords.recommendedProducts &&
              recommendedRecords.recommendedProducts.length > 0 ? (
                recommendedRecords?.recommendedProducts?.map(
                  (product, index) => (
                    <SwiperSlide key={index}>
                      <Link
                        to={`/${product.category.slug}/${product.subcategory.slug}/${product.group.slug}/${product.slug}`}
                      >
                        <img src={product?.images[0].url} />
                        <div className="deal-content-item-details">
                          <p className="deal-content-item-name">
                            {product.name}
                          </p>
                          <p className="deal-content-item-price">
                            {product.price} EUR
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  )
                )
              ) : (
                <Loader />
              )}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="services">
        <div className="service-type delivery">
          <img src="/images/delivery-icon.png" />
          <span>
            Fast and secure <span>delivery</span>
          </span>
        </div>
        <div className="service-type customer-service">
          <img src="/images/service-icon.png" />
          <span>
            Customer service<span>available 24/7</span>
          </span>
        </div>
        <div className="service-type quality">
          <img src="/images/quality-icon.png" />
          <span>
            Quality<span>products and services</span>
          </span>
        </div>
        <div className="service-type complaints">
          <img src="/images/complaint-icon.png" />
          <span>
            Complaint<span>possibility</span>
          </span>
        </div>
      </div>
      <RecommendedProductsList
        recommendedProducts={recommendedRecords?.recommendedProducts}
      />
      <div className="special-discounts-container">
        <h1 className="special-discounts-title">
          Special discounts and promotions
        </h1>
        <div className="special-discounts">
          <div className="headphones-discount">
            <img
              src="/images/headphones-discount.png"
              alt="Headphones Discount"
            />
          </div>
          <div className="phones-discount">
            <img src="/images/phones-discount.png" alt="Phones Discount" />
          </div>
          <div className="mini-discounts">
            <div className="stoves-discount">
              <img src="/images/stoves-discount.png" alt="Stoves Discount" />
            </div>
            <div className="speakers-discount">
              <img
                src="/images/speakers-discount.png"
                alt="Speakers Discount"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="choice-hero-container">
        <div className="best-choice-hero">
          <div className="choice-hero-content">
            <HeroLogoIcon />
            <span>is your choice!</span>
          </div>
          <div className="astronauts-hero">
            <img src="/images/astronauts-mockup.png" />
          </div>
        </div>
      </div>
      <MostWantedCategoriesContainer
        recommendedGroups={recommendedRecords?.recommendedGroups}
      />
      <div className="additional-promotions-slider-container">
        <div className="promotions-hero">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
          >
            {bottomImages?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mobile-promotions-hero">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
          >
            {mobileBottomImages?.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
