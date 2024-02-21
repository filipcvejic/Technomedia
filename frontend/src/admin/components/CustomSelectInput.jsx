import React from "react";
import Creatable from "react-select/creatable";

import "./CustomSelectInput.css";

const CustomSelectInput = ({
  data,
  inputName,
  searchValue,
  setSearchValue,
  onSelectCategory,
}) => {
  const options = data.map((singleCategory) => ({
    value: singleCategory.name,
    label: singleCategory.name,
  }));

  const handleChange = (selectedOption) => {
    setSearchValue(selectedOption.value);
    if (onSelectCategory) {
      onSelectCategory(selectedOption.value);
    }
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSearchValue(inputValue);
    if (onSelectCategory) {
      onSelectCategory(inputValue);
    }
    return newOption;
  };

  return (
    <>
      <label>{inputName}</label>
      <Creatable
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "20px",
            height: "auto",
            fontSize: "14px",
          }),
        }}
        options={options}
        onChange={handleChange}
        onCreateOption={handleCreate}
        value={{ value: searchValue, label: searchValue }}
        placeholder="Select or type..."
        isSearchable
      />
    </>
  );
};

export default CustomSelectInput;
