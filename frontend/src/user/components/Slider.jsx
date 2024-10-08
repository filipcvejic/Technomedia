import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

const Slider = ({ slides }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => {}}
      onSwiper={(swiper) => {}}
      effect={"cube"}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide}>
          <img src={slide} alt="slika" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
