import { useEffect, useState } from "react";

import "./AddProductScreen.css";
import { toast } from "react-toastify";

function AddProductScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [isSubcategoryDisabled, setIsSubcategoryDisabled] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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

  useEffect(() => {
    getCategories();
  }, []);

  const getSubcategories = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/categories/${categoryId}/subcategories`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSubcategories(data.subcategories);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const onChangeCategoryHandler = (event) => {
    const categoryId = event.target.value;
    setCategory(categoryId);
    setIsSubcategoryDisabled(categoryId.trim() === "");
    getSubcategories(categoryId);
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-heading">Add Product</h1>
      <form className="add-product-form">
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
            type="email"
            placeholder="Enter price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="categorySelect"
            name="category"
            value={category}
            onChange={onChangeCategoryHandler}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((signleCategory) => {
              return (
                <option value={signleCategory.name} key={signleCategory._id}>
                  {signleCategory.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory</label>
          <select
            id="subcategorySelect"
            name="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={isSubcategoryDisabled}
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            {subcategories.map((signleSubcategory) => {
              return (
                <option
                  value={signleSubcategory.name}
                  key={signleSubcategory._id}
                >
                  {signleSubcategory.name}
                </option>
              );
            })}
          </select>
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
