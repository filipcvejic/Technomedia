import { useEffect, useState } from "react";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

function SubcategorySelectInput({
  onSelectSubcategory,
  subcategories,
  selectedBrand,
  selectedCategory,
  onChangeSubcategory,
  initialSubcategory,
}) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    initialSubcategory || null
  );

  useEffect(() => {
    setSelectedSubcategory(null);
    onChangeSubcategory("");
  }, [selectedBrand, selectedCategory]);

  const onSubcategoryChangeHadler = (selectedOption) => {
    setSelectedSubcategory(selectedOption);
    onSelectSubcategory(selectedOption.value, selectedOption._id);
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
            categoryName: selectedCategory,
            brandName: selectedBrand,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const newSubcategory = {
        name: data.newSubcategory.name,
        _id: data.newSubcategory._id,
      };
      setSelectedSubcategory({
        value: newSubcategory.name,
        label: newSubcategory.name,
        _id: newSubcategory._id,
      });
      onSelectSubcategory(
        newSubcategory.name,
        newSubcategory._id,
        newSubcategory
      );
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
        value={selectedSubcategory}
        placeholder="Select or type a new subcategory..."
        isSearchable
      />
    </div>
  );
}

export default SubcategorySelectInput;
