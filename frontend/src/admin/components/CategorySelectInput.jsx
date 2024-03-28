import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

function CategorySelectInput({
  setCategories,
  brand,
  categories,
  setCategory,
  setSubcategory,
  category,
  setSubcategories,
}) {
  const getSubcategories = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/categories/${categoryId}/subcategories`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSubcategories(data.subcategories);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const onSelectCategoryHandler = (selectedCategory) => {
    const categoryId = categories.find(
      (category) => category.name === selectedCategory
    )?._id;

    if (categoryId) {
      setSubcategory("");
      getSubcategories(categoryId);
    }
  };

  const options = categories.map((singleCategory) => ({
    value: singleCategory.name,
    label: singleCategory.name,
  }));

  const onCategoryChangeHadler = (selectedOption) => {
    setCategory(selectedOption.value);
    onSelectCategoryHandler(selectedOption.value);
  };

  const createCategoryHandler = async (inputValue) => {
    try {
      const newOption = { value: inputValue, label: inputValue };

      const response = await fetch(
        `http://localhost:3000/api/admin/add-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ brand, category: inputValue }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCategories(data.categories);
      setCategory(inputValue);
      onSelectCategoryHandler(inputValue);
      toast.success(data.message);
      return newOption;
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="category-select-input">
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
        value={{ value: category, label: category }}
        placeholder="Select or type a new category..."
        isSearchable
      />
    </div>
  );
}

export default CategorySelectInput;
