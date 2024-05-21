import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeScreen.css";
import { toast } from "react-toastify";
import RecommendedProductsList from "../components/RecommendedProductsList";
import MostWantedCategoriesContainer from "../components/MostWantedGroupsContainer";
import HeroLogoIcon from "../svgs/HeroLogoIcon";

const HomeScreen = () => {
  const [recommendedRecords, setRecommendedRecords] = useState([]);

  const leftImages = [
    "/images/laptop-mockup.png",
    "/images/pc-mockup.png",
    "/images/watches-mockup.png",
    "/images/phones-mockup.png",
  ];

  const rightImages = [
    "/images/watch-special-offer.png",
    "/images/ipad-special-offer.png",
    "/images/macbook-special-offer.png",
  ];

  const bottomImages = [
    "/images/delivery-promotion-mockup.png",
    "/images/delivery-speed-mockup.png",
    "/images/tablets-promotion-mockup.png",
    "/images/appliances-promotion-mockup.png",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 3000,
    // appendDots: (dots) => (
    //   <div style={{ position: "absolute", bottom: 10, right: 10 }}>
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: function (i) {
    //   return <CustomSliderDots />;
    // },
  };

  useEffect(() => {
    const getRecommendedRecords = async () => {
      try {
        const response = await fetch(
          "https://technomedia-5gpn.onrender.com/api/recommended-records"
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
          <Slider {...sliderSettings}>
            {leftImages.map((image, index) => (
              <div key={index} className="slider-item">
                <img src={image} alt={image} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="homeslider-deal">
          <Slider {...sliderSettings}>
            {rightImages.map((image, index) => (
              <div key={index} className="slider-item">
                <img src={image} alt={image} />
              </div>
            ))}
          </Slider>
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
            <img src="/images/headphones-discount.png"></img>
          </div>
          <div className="additional-discounts">
            <div className="phones-discount">
              <img src="/images/phones-discount.png"></img>
            </div>
            <div className="mini-discounts">
              <div className="stoves-discount">
                <img src="/images/stoves-discount.png"></img>
              </div>
              <div className="speakers-discount">
                <img src="/images/speakers-discount.png"></img>
              </div>
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
          <Slider {...sliderSettings} autoplay={true} autoplaySpeed={3000}>
            {bottomImages.map((image, index) => (
              <div key={index} className="slider-item">
                <img src={image} alt={image} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
