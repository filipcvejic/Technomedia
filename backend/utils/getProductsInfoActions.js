const calculatePriceRange = (products) => {
  const prices = products.map((product) => product.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return { minPrice, maxPrice };
};

const extractUniqueGroups = (products) => {
  return [...new Set(products.map((product) => product.group))];
};

const extractUniqueSubcategories = (products) => {
  const subcategoryCount = {};

  products.forEach((product) => {
    const subcategory = JSON.stringify(product.subcategory);
    if (!subcategoryCount[subcategory]) {
      subcategoryCount[subcategory] = 0;
    }
    subcategoryCount[subcategory]++;
  });

  const uniqueSubcategories = Object.entries(subcategoryCount).map(
    ([subcategory, count]) => ({
      subcategory: JSON.parse(subcategory),
      count,
    })
  );

  return uniqueSubcategories;
};

const extractBrands = (products) => {
  return products.map((product) => product.brand);
};

module.exports = {
  calculatePriceRange,
  extractUniqueGroups,
  extractUniqueSubcategories,
  extractBrands,
};
