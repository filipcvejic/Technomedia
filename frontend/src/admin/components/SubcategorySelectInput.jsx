import { useEffect, useState } from "react";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

function SubcategorySelectInput({
  onSelectSubcategory,
  subcategories,
  selectedCategory,
  onChangeGroup,
  onChangeBrand,
  initialSubcategory,
}) {
  const resetInputs = () => {
    onChangeGroup("");
    onChangeBrand("");
  };

  const onSubcategoryChangeHadler = (selectedOption) => {
    onSelectSubcategory(selectedOption);
    resetInputs();
  };

  const createSubcategoryHandler = async (inputValue) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/add-subcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            subcategoryName: inputValue,
            categoryId: selectedCategory._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const newSubcategory = data.newSubcategory;

      const isNewSubcategory = !subcategories.find(
        (subcategory) => subcategory._id === newSubcategory._id
      );

      onSelectSubcategory(
        {
          value: newSubcategory.name,
          label: newSubcategory.name,
          _id: newSubcategory._id,
        },
        isNewSubcategory && {
          info: newSubcategory,
        }
      );
      resetInputs();

      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const options =
    subcategories?.map((singleSubcategory) => ({
      value: singleSubcategory.name,
      label: singleSubcategory.name,
      _id: singleSubcategory._id,
    })) || [];

  return (
    <div className="subcategory-select-input">
      <label>Subcategory</label>
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
        onChange={onSubcategoryChangeHadler}
        onCreateOption={createSubcategoryHandler}
        value={initialSubcategory}
        placeholder="Select or type a new subcategory..."
        isSearchable
      />
    </div>
  );
}

export default SubcategorySelectInput;
