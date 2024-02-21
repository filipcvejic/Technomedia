import { useEffect, useState } from "react";

import "./AddProductScreen.css";
import { toast } from "react-toastify";
import SelectInputWithCreate from "../components/CustomSelectInput";
import EditableSelect from "../components/CustomSelectInput";
import SearchBar from "../components/CustomSelectInput";
import CustomSelectInput from "../components/CustomSelectInput";

function AddProductScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [isSubcategoryDisabled, setIsSubcategoryDisabled] = useState(true);
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

  const onSelectCategory = (selectedCategory) => {
    const categoryId = categories.find(
      (category) => category.name === selectedCategory
    )?._id;

    if (categoryId) {
      getSubcategories(categoryId);
    }
  };

  const addProductHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          description,
          price,
          category,
          subcategory,
        }),
      });

      const data = await response.json();

      console.log(data);
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
          <CustomSelectInput
            data={categories}
            inputName="Category"
            setSearchValue={setCategory}
            searchValue={category}
            onSelectCategory={onSelectCategory}
          />
        </div>
        <div className="form-group">
          <CustomSelectInput
            data={subcategories}
            inputName="Subcategory"
            setSearchValue={setSubcategory}
            searchValue={subcategory}
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
