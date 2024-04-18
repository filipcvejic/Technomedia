import Creatable from "react-select/creatable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CategorySelectInput({
  onSelectCategory,
  onChangeSubcategory,
  onChangeGroup,
  onChangeBrand,
  categories,
  initialCategory,
}) {
  useEffect(() => {
    onChangeSubcategory("");
    onChangeGroup("");
    onChangeBrand("");
  }, [initialCategory]);

  const onCategoryChangeHadler = (selectedOption) => {
    onSelectCategory(selectedOption);
  };

  const createCategoryHandler = async (inputValue) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/add-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ categoryName: inputValue }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const newCategory = data.newCategory;

      const isNewCategory = !categories.find(
        (category) => category._id === newCategory._id
      );

      onSelectCategory(
        {
          value: newCategory.name,
          label: newCategory.name,
          _id: newCategory._id,
        },
        isNewCategory && {
          info: newCategory,
        }
      );

      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const options =
    categories?.map((singleCategory) => ({
      value: singleCategory.name,
      label: singleCategory.name,
      _id: singleCategory._id,
    })) || [];

  return (
    <div className="brand-select-input">
      <label>Category</label>
      <Creatable
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "20px",
            height: "42px",
            fontSize: "14px",
            backgroundColor: "#E6E6E6",
            borderRadius: "10px",
            border: "none",
          }),
        }}
        options={options}
        onChange={onCategoryChangeHadler}
        onCreateOption={createCategoryHandler}
        value={initialCategory}
        placeholder="Select or type a new category..."
        isSearchable
        required
      />
    </div>
  );
}

export default CategorySelectInput;
