import { useRef, useState } from "react";

import "./ImageUploadInput.css";

function ImageUploadInput({ onImageUpload }) {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const fileSelectHandler = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImages = files.filter(
      (file) => file.type.split("/")[0] === "image"
    );

    const updatedImages = [
      ...images.slice(0, 3 - newImages.length),
      ...newImages.map((newImage) => ({
        name: newImage.name,
        url: URL.createObjectURL(newImage),
      })),
    ];

    setImages(updatedImages);
    onImageUpload(updatedImages);
  };

  const removeImageHandler = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="image-upload-container">
      <div className="drag-area" onClick={selectFiles}>
        <div className="circle">
          <div className="circle-content">+</div>
        </div>
        <input
          className="file-input"
          name="image"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={fileSelectHandler}
          hidden
        />
      </div>
      <div className="images-preview">
        {[...Array(3)].map((_, index) => (
          <div className="single-image-preview" key={index}>
            {images[index] && (
              <img src={images[index].url} alt={images[index].name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploadInput;
