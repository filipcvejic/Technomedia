import React from "react";
import "./SearchItem.css";

export default function SearchItem({ data, searchTerm }) {
  const formatProductName = (productName, searchTerm) => {
    const searchWords = searchTerm.trim().split(/\s+/);
    const regex = new RegExp(`(${searchWords.join("|")}\\s*|\\s+)`, "gi");
    const parts = productName.split(regex);

    return parts.map((part, index) => {
      const isSearchWord = searchWords.some((word) =>
        new RegExp(word, "gi").test(part)
      );

      const style = {
        color: isSearchWord ? "#FF5C00" : "black",
        fontWeight: isSearchWord ? "bolder" : "normal",
      };

      return (
        <span key={index} style={style}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="search-product-item" key={data._id}>
      <div className="search-product-wish-list-action">
        <button className="search-product-wish-list-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 512 512"
            version="1.1"
          >
            <path d="" stroke="none" fill="#080404" fillRule="evenodd" />
            <path
              d="M 119 44.490 C 73.041 52.361, 34.848 80.464, 14.215 121.591 C 9.364 131.259, 4.729 144.658, 2.312 156 C -0.272 168.124, -0.238 199.951, 2.372 212 C 6.928 233.036, 16.542 254.898, 28.739 271.956 C 44.686 294.261, 95.066 341.588, 174.500 408.886 C 217.503 445.319, 243.085 466.138, 246.712 467.653 C 251.933 469.835, 261.977 469.384, 266.838 466.750 C 270.976 464.507, 320.961 423.252, 358 391.508 C 419.727 338.605, 466.079 294.789, 480.288 275.911 C 496.044 254.977, 506.596 231.031, 509.994 208.500 C 510.658 204.100, 511.606 199.719, 512.100 198.764 C 513.372 196.309, 513.277 166.711, 512 167.500 C 511.431 167.852, 511 166.996, 511 165.517 C 511 164.086, 510.295 159.447, 509.433 155.208 C 499.641 107.053, 462.723 65.753, 415.500 50.123 C 400.583 45.186, 392.677 43.874, 374.331 43.295 C 354.321 42.662, 343.385 44.080, 326.187 49.534 C 303.994 56.572, 287.373 66.806, 268.756 84.895 L 256 97.289 243.244 84.895 C 230.040 72.065, 221.943 66.042, 207.764 58.499 C 197.396 52.983, 178.427 46.650, 166.074 44.580 C 154.711 42.675, 129.870 42.628, 119 44.490 M 120.192 90.987 C 85.795 98.988, 57.772 126.022, 48.861 159.802 C 46.250 169.699, 45.370 187.227, 46.937 198.122 C 49.219 213.988, 55.976 230.560, 66.049 245 C 80.145 265.206, 146.463 325.918, 235.251 399.898 L 256.002 417.188 273.751 402.384 C 344.915 343.024, 388.879 304.152, 420.609 272.537 C 446.494 246.746, 454.039 236.026, 460.961 215.211 C 466.670 198.042, 467.490 176.307, 463.062 159.500 C 453.973 125.001, 424.670 97.694, 389.001 90.485 C 377.268 88.113, 354.718 88.846, 344.067 91.945 C 334.888 94.617, 323.971 99.601, 316.308 104.620 C 313.113 106.712, 301.500 117.261, 290.500 128.062 C 279.500 138.863, 268.987 148.480, 267.137 149.434 C 261.913 152.128, 254.160 152.546, 247.913 150.471 C 243.160 148.893, 240.227 146.410, 222.027 128.564 C 200.827 107.777, 195.008 103.184, 182.625 97.462 C 169.244 91.280, 162.237 89.800, 144.500 89.408 C 131.323 89.117, 127.034 89.396, 120.192 90.987 M 0.405 183.500 C 0.406 192.300, 0.559 195.766, 0.745 191.203 C 0.930 186.639, 0.929 179.439, 0.742 175.203 C 0.555 170.966, 0.404 174.700, 0.405 183.500"
              stroke="none"
              fill="#040404"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <a
        href={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
      >
        <span className="search-product-image-container">
          <img
            className="search-product-image-photo"
            src={`${import.meta.env.VITE_API_URL}/images/${
              data.images[0].url.split("\\")[2]
            }`}
            alt={data.name}
          />
        </span>
      </a>
      <div className="search-product-item-details">
        <strong className="search-product-item-name">
          <a
            href={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
          >
            {formatProductName(data.name, searchTerm)}
          </a>
        </strong>
      </div>
      <div className="search-product-price-container">
        <span className="search-product-price">{data.price} EUR</span>
      </div>
    </div>
  );
}
