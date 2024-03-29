import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

function SubcategorySelectInput({
  setSubcategories,
  subcategories,
  subcategory,
  setSubcategory,
  category,
}) {
  const options = subcategories.map((singleSubcategory) => ({
    value: singleSubcategory.name,
    label: singleSubcategory.name,
  }));

  const onSubcategoryChangeHadler = (selectedOption) => {
    setSubcategory(selectedOption.value);
  };

  const createSubcategoryHandler = async (inputValue) => {
    try {
      const newOption = { value: inputValue, label: inputValue };

      const response = await fetch(
        `http://localhost:3000/api/admin/add-subcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ category, subcategory: inputValue }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSubcategories(data.subcategories);
      setSubcategory(inputValue);
      toast.success(data.message);
      return newOption;
    } catch (err) {
      toast.error(err?.message);
    }
  };

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
        value={{ value: subcategory, label: subcategory }}
        placeholder="Select or type a new subcategory..."
        isSearchable
      />
    </div>
  );
}

export default SubcategorySelectInput;
