import React, { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export function useProductsContext() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setProducts(data.products);
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.message);
      }
    };

    fetchProducts();
  }, []);

  const contextValue = {
    products,
    isLoading,
  };

  return (
    <React.Fragment>
      <ProductsContext.Provider value={contextValue}>
        {children}
      </ProductsContext.Provider>
    </React.Fragment>
  );
}
