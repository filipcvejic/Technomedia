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
  const [selectedBrand, setSelectedBrand] = useState(initialBrand || null);

  useEffect(() => {
    onChangeCategory("");
    onChangeSubcategory("");
  }, [selectedBrand]);

  const onBrandChangeHadler = (selectedOption) => {
    setSelectedBrand(selectedOption);
    onSelectBrand(selectedOption.value, selectedOption._id);
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

      const newBrand = { name: data.newBrand.name, _id: data.newBrand._id };
      setSelectedBrand({
        value: newBrand.name,
        label: newBrand.name,
        _id: newBrand._id,
      });
      onSelectBrand(newBrand.name, newBrand._id, newBrand);
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
        value={selectedBrand}
        placeholder="Select or type a new brand..."
        isSearchable
      />
    </div>
  );
}

export default BrandSelectInput;
