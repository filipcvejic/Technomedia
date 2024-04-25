import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import CategorySelectInput from "./CategorySelectInput";
import SubcategorySelectInput from "./SubcategorySelectInput";
import GroupSelectInput from "./GroupSelectInput";
import BrandSelectInput from "./BrandSelectInput";
import ImageUploadInput from "./ImageUploadInput";
import SpecificationsSelectInput from "./SpecificationsSelectInput";

import "./AddProductFormModal.css";

function AddProductFormModal({ onAddProduct, onCloseModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [group, setGroup] = useState("");
  const [brand, setBrand] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getRecords();
  }, []);

  const outsideModalClickHandler = (event) => {
    if (event.target.classList.contains("add-product-container")) {
      onCloseModal();
    }
  };

  const getRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/records/info"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCategories(data.records.map((singleCategory) => singleCategory));
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const onChangeSubcategoryHandler = (subcategory) => {
    setSubcategory(subcategory);
  };

  const onChangeGroupHandler = (group) => {
    setGroup(group);
  };

  const onChangeBrandHandler = (brand) => {
    setBrand(brand);
  };

  const onSelectCategoryHandler = (categoryInput, newCategory) => {
    setCategory(categoryInput);

    const selectedCategory = categories.find(
      (singleCategory) => singleCategory._id === categoryInput._id
    );

    console.log(selectedCategory);

    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories);
    }

    if (newCategory) {
      setCategories((prevCategories) => [...prevCategories, newCategory.info]);
      setSubcategories(newCategory.info.subcategories);
    }

    setGroups([]);
    setBrands([]);
  };

  const onSelectSubcategoryHandler = (subcategoryInput, newSubcategory) => {
    setSubcategory(subcategoryInput);

    const selectedSubcategory = subcategories.find(
      (singleSubcategory) => singleSubcategory._id === subcategoryInput._id
    );

    if (selectedSubcategory) {
      setGroups(selectedSubcategory.groups);
    }

    if (newSubcategory) {
      const selectedCategoryIndex = categories.findIndex(
        (singleCategory) => singleCategory._id === category._id
      );

      if (selectedCategoryIndex !== -1) {
        const updatedCategories = [...categories];

        updatedCategories[selectedCategoryIndex].subcategories.push(
          newSubcategory.info
        );

        setCategories(updatedCategories);
        setSubcategories(
          updatedCategories[selectedCategoryIndex].subcategories
        );
        setGroups([]);
        setBrands([]);
      }
    }
  };

  const onSelectGroupHandler = (groupInput, newGroup) => {
    setGroup(groupInput);

    const selectedGroup = groups.find(
      (singleGroup) => singleGroup._id === groupInput._id
    );

    if (selectedGroup) {
      setBrands(selectedGroup.brands);
    }

    if (newGroup) {
      const updatedCategories = [...categories];

      const selectedCategoryIndex = updatedCategories.findIndex(
        (singleCategory) => singleCategory._id === category._id
      );

      if (selectedCategoryIndex !== -1) {
        const selectedSubcategoryIndex = updatedCategories[
          selectedCategoryIndex
        ].subcategories.findIndex(
          (singleSubcategory) => singleSubcategory._id === subcategory._id
        );

        if (selectedSubcategoryIndex !== -1) {
          const updatedSubcategory = {
            ...updatedCategories[selectedCategoryIndex].subcategories[
              selectedSubcategoryIndex
            ],
          };
          updatedSubcategory.groups.push(newGroup.info);
          updatedSubcategory.groups.forEach((group) => {
            group.brands.push(newGroup.info.brands);
          });

          updatedCategories[selectedCategoryIndex].subcategories[
            selectedSubcategoryIndex
          ] = updatedSubcategory;

          setCategories(updatedCategories);
          setSubcategories(
            updatedCategories[selectedCategoryIndex].subcategories
          );
          setGroups(updatedSubcategory.groups);
          setBrands(selectedGroup.brands);
        }
      }
    }
  };

  const onSelectBrandHandler = (brandInput, newBrand) => {
    setBrand(brandInput);

    if (newBrand) {
      const updatedCategories = [...categories];
      const selectedCategoryIndex = updatedCategories.findIndex(
        (singleCategory) => singleCategory._id === category._id
      );

      if (selectedCategoryIndex !== -1) {
        const selectedSubcategoryIndex = updatedCategories[
          selectedCategoryIndex
        ].subcategories.findIndex(
          (singleSubcategory) => singleSubcategory._id === subcategory._id
        );

        if (selectedSubcategoryIndex !== -1) {
          const selectedGroupIndex = updatedCategories[
            selectedCategoryIndex
          ].subcategories[selectedSubcategoryIndex].groups.findIndex(
            (singleGroup) => singleGroup._id === group._id
          );

          if (selectedGroupIndex !== -1) {
            const updatedGroup = {
              ...updatedCategories[selectedCategoryIndex].subcategories[
                selectedSubcategoryIndex
              ].groups[selectedGroupIndex],
            };

            updatedGroup.brands.push(newBrand.info);
            updatedCategories[selectedCategoryIndex].subcategories[
              selectedSubcategoryIndex
            ].groups[selectedGroupIndex] = updatedGroup;

            setCategories(updatedCategories);
            setSubcategories(
              updatedCategories[selectedCategoryIndex].subcategories
            );
            setGroups(
              updatedCategories[selectedCategoryIndex].subcategories[
                selectedSubcategoryIndex
              ].groups
            );
            setBrands(updatedGroup.brands);
          }
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
      formData.append("category", category?.label);
      formData.append("subcategory", subcategory?.label);
      formData.append("group", group?.label);
      formData.append("brand", brand?.label);
      formData.append("specifications", JSON.stringify(specifications));

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

      onAddProduct(data.addedProduct);

      setName("");
      setDescription("");
      setPrice("");
      setImages([]);
      setBrand("");
      setCategory("");
      setSubcategory("");
      setGroup("");
      setGroups([]);
      setSpecifications([]);
      setSubcategories([]);
      setBrands([]);
      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return ReactDOM.createPortal(
    <div className="add-product-container" onClick={outsideModalClickHandler}>
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
            <textarea
              className="textarea-description"
              rows="6"
              maxLength="400"
              placeholder="Enter description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="form-element">
            <CategorySelectInput
              onSelectCategory={onSelectCategoryHandler}
              onChangeSubcategory={onChangeSubcategoryHandler}
              onChangeGroup={onChangeGroupHandler}
              onChangeBrand={onChangeBrandHandler}
              categories={categories}
              initialCategory={category}
            />
          </div>
          <div className="form-element">
            <SubcategorySelectInput
              onSelectSubcategory={onSelectSubcategoryHandler}
              subcategories={subcategories}
              selectedCategory={category}
              onChangeGroup={onChangeGroupHandler}
              onChangeBrand={onChangeBrandHandler}
              initialSubcategory={subcategory}
            />
          </div>
          <div className="form-element">
            <GroupSelectInput
              groups={groups}
              selectedCategory={category}
              selectedSubcategory={subcategory}
              onSelectGroup={onSelectGroupHandler}
              onChangeBrand={onChangeBrandHandler}
              initialGroup={group}
            />
          </div>
          <div className="form-element">
            <BrandSelectInput
              brands={brands}
              onSelectBrand={onSelectBrandHandler}
              initialBrand={brand}
              selectedGroup={group}
            />
          </div>
          <div className="form">
            <SpecificationsSelectInput
              onSpecSelect={addSpecificationHandler}
              initialSpecifications={specifications}
            />
          </div>
          <div className="add-product-submition">
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
    </div>,
    document.getElementById("modal-root")
  );
}

export default AddProductFormModal;
