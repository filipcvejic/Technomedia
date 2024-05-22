import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminProductItem from "../components/AdminProductItem";

import "./AdminProductsScreen.css";

import ProductFormModal from "../components/ProductFormModal";

function AdminProductsScreen() {
  const [products, setProducts] = useState([]);
  const [isAddProductFormShown, setIsAddProductFormShown] = useState(false);

  const onCloseModalHandler = () => {
    setIsAddProductFormShown(false);
  };

  const onDeleteProductHandler = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter(
        (singleProduct) => singleProduct._id.toString() !== productId.toString()
      )
    );
  };

  useEffect(() => {
    try {
      const getAllProductsData = async () => {
        const response = await fetch(
          "https://technomedia-5gpn.onrender.com/api/admin/products",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setProducts(data.products);
      };

      getAllProductsData();
    } catch (err) {
      toast.error(err);
    }
  }, []);

  const onSubmitProductHandler = (product) => {
    setProducts((prevProducts) => {
      let updatedProducts = [...prevProducts];

      const existingProductIndex = prevProducts.findIndex(
        (prevProduct) => prevProduct._id === product._id
      );

      if (existingProductIndex !== -1) {
        updatedProducts[existingProductIndex] = product;
      } else {
        updatedProducts.push(product);
      }

      return updatedProducts;
    });
  };

  return (
    <>
      {products && (
        <div className="admin-products-container">
          <button
            className="add-product-button"
            onClick={() => setIsAddProductFormShown(true)}
          >
            Add new product <span>+</span>
          </button>
          <div className="admin-products-wrapper">
            <div className="admin-products">
              {products?.map((product) => (
                <AdminProductItem
                  data={product}
                  key={product._id}
                  onSubmitProduct={onSubmitProductHandler}
                  onDeleteProduct={onDeleteProductHandler}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {isAddProductFormShown && (
        <ProductFormModal
          onSubmitProduct={onSubmitProductHandler}
          onCloseModal={onCloseModalHandler}
        />
      )}
    </>
  );
}

export default AdminProductsScreen;
