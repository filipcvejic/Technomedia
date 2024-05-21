import React, { useEffect } from "react";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

function BrandSelectInput({
  brands,
  onSelectBrand,
  initialBrand,
  selectedGroup,
}) {
  const onBrandChangeHandler = (selectedOption) => {
    onSelectBrand(selectedOption);
  };

  const createBrandHandler = async (inputValue) => {
    try {
      const response = await fetch(
        `https://technomedia-5gpn.onrender.com/api/admin/add-brand`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            brandName: inputValue,
            groupId: selectedGroup._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const newBrand = data.newBrand;

      const isNewBrand = !brands.find((brand) => brand._id === newBrand._id);

      onSelectBrand(
        {
          value: newBrand.name,
          label: newBrand.name,
          _id: newBrand._id,
        },
        isNewBrand && { info: newBrand }
      );
      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const options =
    brands?.map((singleBrand) => ({
      value: singleBrand.name,
      label: singleBrand.name,
      _id: singleBrand._id,
    })) || [];

  return (
    <div className="brand-select-input">
      <label>Brand</label>
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
        onChange={onBrandChangeHandler}
        onCreateOption={createBrandHandler}
        value={initialBrand}
        placeholder="Select or type a new brand..."
        isSearchable
        required
      />
    </div>
  );
}

export default BrandSelectInput;
