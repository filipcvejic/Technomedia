import "./CustomDotsSlider.css";

const CustomSliderDots = ({ active, onClick }) => {
  return (
    <div
      className={`custom-slider-dot ${active ? "active" : ""}`}
      onClick={onClick}
    />
  );
};

export default CustomSliderDots;
