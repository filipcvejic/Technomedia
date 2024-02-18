import React from "react";

function AddCategoryScreen() {
  return (
    <div className="add-product-container">
      <h1 className="add-product-heading">Add Product</h1>
      <form className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="email"
            placeholder="Enter price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="categorySelect"
            name="category"
            value={category}
            onChange={onChangeCategoryHandler}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((signleCategory) => {
              return (
                <option value={signleCategory.name} key={signleCategory._id}>
                  {signleCategory.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory</label>
          <select
            id="subcategorySelect"
            name="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            {subcategories.map((signleSubcategory) => {
              return (
                <option
                  value={signleSubcategory.name}
                  key={signleSubcategory._id}
                >
                  {signleSubcategory.name}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      {/* {isLoading && (
        <div className="loader-wrapper">
          <span className="spinner"></span>
        </div>
      )} */}
    </div>
  );
}

export default AddCategoryScreen;
