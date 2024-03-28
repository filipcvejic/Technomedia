import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

function BrandSelectInput({
  brands,
  setBrands,
  setBrand,
  setCategory,
  brand,
  setCategories,
}) {
  const getCategories = async (brandId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/brands/${brandId}/categories`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCategories(data.categories);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const onSelectBrandHandler = (selectedBrand) => {
    const brandId = brands.find((brand) => brand.name === selectedBrand)?._id;

    if (brandId) {
      setCategory("");
      getCategories(brandId);
    }
  };

  const options = brands.map((singleBrand) => ({
    value: singleBrand.name,
    label: singleBrand.name,
  }));

  const onBrandChangeHadler = (selectedOption) => {
    setBrand(selectedOption.value);
    onSelectBrandHandler(selectedOption.value);
  };

  const createBrandHandler = async (inputValue) => {
    try {
      const newOption = { value: inputValue, label: inputValue };
      const brandId = brands.find((brand) => brand.name === inputValue)?._id;

      const response = await fetch(
        `http://localhost:3000/api/admin/add-brand`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ brand: inputValue }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setBrand(inputValue);
      setBrands(data.brands);
      onSelectBrandHandler(inputValue);
      toast.success(data.message);
      return newOption;
    } catch (err) {
      toast.error(err?.message);
    }
  };

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
        value={{ value: brand, label: brand }}
        placeholder="Select or type a new brand..."
        isSearchable
      />
    </div>
  );
}

export default BrandSelectInput;
