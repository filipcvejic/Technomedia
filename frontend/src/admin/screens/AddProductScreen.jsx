import { useEffect, useState } from "react";

import "./AddProductScreen.css";
import { toast } from "react-toastify";
import CategorySelectInput from "../components/CategorySelectInput";
import SubcategorySelectInput from "../components/SubcategorySelectInput";
import BrandSelectInput from "../components/BrandSelectInput";
import ImageUploadInput from "../components/ImageUploadInput";
import SpecificationsSelectInput from "../components/SpecificationsSelectInput";

function AddProductScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  console.log(category);

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/records/info"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setBrands(data.records.map((singleBrand) => singleBrand));
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const onChangeCategoryHandler = (category) => {
    setCategory(category);
  };

  const onChangeSubcategoryHandler = (subcategory) => {
    setSubcategory(subcategory);
  };

  const onSelectBrandHandler = (brandName, brandId, newBrand) => {
    setBrand(brandName);

    const selectedBrand = brands.find((brand) => brand._id === brandId);
    if (selectedBrand) {
      setCategories(selectedBrand.categories);
      setSubcategories([]);
    }

    if (newBrand && !brands.find((brand) => brand._id === newBrand._id)) {
      setBrands((prevBrands) => [...prevBrands, newBrand]);
    }
  };

  const onSelectCategoryHandler = (categoryName, categoryId, newCategory) => {
    setCategory(categoryName);

    const selectedCategory = categories.find(
      (category) => category._id === categoryId
    );
    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories);
    }

    if (
      newCategory &&
      !categories.find((category) => category._id === newCategory._id)
    ) {
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    }
  };

  console.log(category);

  const onSelectSubcategoryHandler = (subcategory) => {
    setSubcategory(subcategory);
  };

  const imageUploadHandler = (images) => {
    setImages(images);
  };

  const resetImagesHandler = () => {
    setImages([]);
  };

  const addSpecificationHandler = (specs) => {
    setSpecifications(specs);
  };

  const addProductHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image);
      });

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("specifications", JSON.stringify(specifications));

      console.log(brand, category);

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
      setImages([]);
      resetImagesHandler();
      setBrand("");
      setCategory("");
      setSubcategory("");
      setSpecifications([]);

      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  console.log(brands);

  return (
    <div className="add-product-container">
      {/* <h1 className="add-product-title">Add Product</h1> */}
      <form className="add-product-form" onSubmit={addProductHandler}>
        <div className="image-price-wrapper">
          <div className="image-container">
            <label htmlFor="image">Add images</label>
            <ImageUploadInput
              onImageUpload={imageUploadHandler}
              onResetImages={resetImagesHandler}
              initialImages={images}
            />
          </div>
          <div className="price-container">
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
        </div>
        <div className="necessary-details-container">
          <div className="custom-form-element">
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
          <div className="custom-form-element">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="form-element">
            <BrandSelectInput
              onSelectBrand={onSelectBrandHandler}
              onChangeCategory={onChangeCategoryHandler}
              onChangeSubcategory={onChangeSubcategoryHandler}
              initialBrand={brand}
              brands={
                brands
                  ? brands.map((brand) => ({
                      _id: brand._id,
                      name: brand.name,
                    }))
                  : []
              }
            />
          </div>
          <div className="form-element">
            <CategorySelectInput
              onSelectCategory={onSelectCategoryHandler}
              onChangeSubcategory={onChangeSubcategoryHandler}
              selectedBrand={brand}
              initialCategory={category}
              categories={
                categories
                  ? categories.map((category) => ({
                      _id: category._id,
                      name: category.name,
                    }))
                  : []
              }
            />
          </div>
          <div className="form-element">
            <SubcategorySelectInput
              onSelectSubcategory={onSelectSubcategoryHandler}
              subcategories={subcategories}
              selectedBrand={brand}
              selectedCategory={category}
              initialSubcategory={subcategory}
              onChangeSubcategory={onChangeSubcategoryHandler}
            />
          </div>
          <div className="form">
            <SpecificationsSelectInput onSpecSelect={addSpecificationHandler} />
          </div>
          <div className="submit-product">
            <button type="submit">Add product</button>
          </div>
          <div className="product-specifications-container"></div>
        </div>
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
