import { useState, useRef } from "react";

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

    const newImages = [];
    for (let i = 0; i < files.length && i < 3 - images.length; i++) {
      newImages.push(files[i]);
    }

    setImages((prevImages) => [...prevImages, ...newImages]);
    onImageUpload([...images, ...newImages]);
  };

  const removeImageHandler = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    onImageUpload(updatedImages);
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
              <>
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`Image ${index}`}
                />
                <button
                  className="remove-image-button"
                  onClick={() => removeImageHandler(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="black"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploadInput;
