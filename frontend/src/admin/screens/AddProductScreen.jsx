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

  const onSelectBrandHandler = (brandInput, newBrand) => {
    setBrand(brandInput);

    const selectedBrand = brands.find(
      (singleBrand) => singleBrand._id === brandInput._id
    );

    if (selectedBrand) {
      setCategories(selectedBrand.categories);
      setSubcategories([]);
    }

    if (newBrand) {
      setBrands((prevBrands) => [...prevBrands, newBrand.info]);
      setCategories(newBrand.info.categories);
      setSubcategories([]);
    }
  };

  const onSelectCategoryHandler = (categoryInput, newCategory) => {
    setCategory(categoryInput);

    const selectedCategory = categories.find(
      (singleCategory) => singleCategory._id === categoryInput._id
    );

    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories);
    }

    if (newCategory) {
      const selectedBrandIndex = brands.findIndex(
        (singleBrand) => singleBrand._id === brand._id
      );

      if (selectedBrandIndex !== -1) {
        const updatedBrands = [...brands];

        updatedBrands[selectedBrandIndex].categories.push(newCategory.info);

        setBrands(updatedBrands);
        setCategories(updatedBrands[selectedBrandIndex].categories);
        setSubcategories([]);
      }
    }
  };

  const onSelectSubcategoryHandler = (subcategoryInput, newSubcategory) => {
    setSubcategory(subcategoryInput);

    if (newSubcategory) {
      const updatedBrands = [...brands];

      const selectedBrandIndex = updatedBrands.findIndex(
        (singleBrand) => singleBrand._id === brand._id
      );

      if (selectedBrandIndex !== -1) {
        const selectedCategoryIndex = updatedBrands[
          selectedBrandIndex
        ].categories.findIndex(
          (singleCategory) => singleCategory._id === category._id
        );

        if (selectedCategoryIndex !== -1) {
          const updatedCategory = {
            ...updatedBrands[selectedBrandIndex].categories[
              selectedCategoryIndex
            ],
          };
          updatedCategory.subcategories.push(newSubcategory.info);
          updatedBrands[selectedBrandIndex].categories[selectedCategoryIndex] =
            updatedCategory;

          setBrands(updatedBrands);
          setCategories(updatedBrands[selectedBrandIndex].categories);
          setSubcategories(updatedCategory.subcategories);
        }
      }
    }
  };

  const imageUploadHandler = (images) => {
    setImages(images);
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
      formData.append("brand", brand?.label);
      formData.append("category", category?.label);
      formData.append("subcategory", subcategory?.label);
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
      setBrand("");
      setCategory("");
      setSubcategory("");
      setSpecifications([]);
      setCategories([]);
      setSubcategories([]);

      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={addProductHandler}>
        <div className="image-price-wrapper">
          <div className="image-container">
            <label htmlFor="image">Add images</label>
            <ImageUploadInput
              onImageUpload={imageUploadHandler}
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
            <SpecificationsSelectInput
              onSpecSelect={addSpecificationHandler}
              initialSpecifications={specifications}
            />
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
