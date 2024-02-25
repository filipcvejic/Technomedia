import { useEffect, useState } from "react";

import "./AddProductScreen.css";
import { toast } from "react-toastify";
import CategorySelectInput from "../components/CategorySelectInput";
import SubcategorySelectInput from "../components/SubcategorySelectInput";

function AddProductScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/categories"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCategories(data.categories);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const addProductHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("category", category);
      formData.append("subcategory", subcategory);

      const response = await fetch(
        "http://localhost:3000/api/admin/add-product",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSubcategory("");

      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-heading">Add Product</h1>
      <form className="add-product-form" onSubmit={addProductHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            placeholder="Enter price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            placeholder="Place product image"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <CategorySelectInput
            categories={categories}
            setCategory={setCategory}
            setSubcategory={setSubcategory}
            category={category}
            setSubcategories={setSubcategories}
          />
        </div>
        <div className="form-group">
          <SubcategorySelectInput
            subcategories={subcategories}
            subcategory={subcategory}
            setSubcategory={setSubcategory}
            category={category}
          />
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      {/* {isLoading && (
        <div className="loader-wrapper">
          <span className="spinner"></span>
        </div>
      )} */}
    </div>
  );
}

export default AddProductScreen;