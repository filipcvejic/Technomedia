import Creatable from "react-select/creatable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BrandSelectInput({
  onSelectBrand,
  onChangeCategory,
  onChangeSubcategory,
  brands,
  initialBrand,
}) {
  useEffect(() => {
    onChangeCategory("");
    onChangeSubcategory("");
  }, [initialBrand]);

  const onBrandChangeHadler = (selectedOption) => {
    onSelectBrand(selectedOption);
  };

  const createBrandHandler = async (inputValue) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/add-brand`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ brandName: inputValue }),
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
        isNewBrand && {
          info: newBrand,
        }
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
        onChange={onBrandChangeHadler}
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
