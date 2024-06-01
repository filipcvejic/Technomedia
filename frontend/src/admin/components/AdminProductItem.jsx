import React, { useState } from "react";

import "./AdminProductItem.css";
import { toast } from "react-toastify";
import ProductFormModal from "./ProductFormModal";
import { normalizePath } from "../../shared/utils/normalizePath";

function AdminProductItem({ data, onDeleteProduct, onSubmitProduct }) {
  const [areProductActionsShown, setAreProductActionsShown] = useState(false);
  const [isEditProductFormShown, setIsEditProductFormShown] = useState(false);

  const deleteProductHandler = async (productId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/delete-product/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      onDeleteProduct(productId);
    } catch (err) {
      toast.error(err);
    }
  };

  const onCloseModalHandler = () => {
    setIsEditProductFormShown(false);
  };

  const openEditFormHandler = (event) => {
    event.preventDefault();

    setIsEditProductFormShown(true);
    setAreProductActionsShown(false);
  };

  console.log(normalizePath(data.images[0].url));

  return (
    <div
      className={`admin-product-item ${areProductActionsShown ? "active" : ""}`}
    >
      {!areProductActionsShown ? (
        <>
          <span className="admin-product-image-container">
            <img
              className="admin-product-image-photo"
              src={`${import.meta.env.VITE_API_URL}/images/${normalizePath(
                data.images[0].url
              )}`}
              alt={data.name}
            />
          </span>
          <div className="admin-product-item-details">
            <strong className="admin-product-item-name">
              <span>{data.name}</span>
            </strong>
            <div className="admin-product-price-container">
              <span className="admin-product-price">{data.price} EUR</span>
            </div>
          </div>
          <div
            className="admin-product-item-options"
            onClick={() => setAreProductActionsShown(true)}
          >
            <div className="three-dots-icon">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="admin-product-item-actions">
          <button className="edit-button" onClick={openEditFormHandler}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => deleteProductHandler(data._id)}
          >
            Delete
          </button>
          <button
            className="close-button"
            onClick={() => setAreProductActionsShown(false)}
          >
            X
          </button>
        </div>
      )}
      {isEditProductFormShown && (
        <ProductFormModal
          data={data}
          onSubmitProduct={onSubmitProduct}
          onCloseModal={onCloseModalHandler}
        />
      )}
    </div>
  );
}

export default AdminProductItem;
