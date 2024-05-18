import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from '../components/navbar/Navbar';
import { getAllProucts } from "../helper/getData";
import ProductList from "../components/Product List/ProductList";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  const { state } = useLocation(); // Access location state

  const [sortBy, setSortBy] = useState(""); // State for sorting

  useEffect(() => {
    // Check if state exists and set products accordingly
    if (state && state.products) {
      setProducts(state.products);
    } else {
      const fetchProducts = async () => {
        try {
          const response = await getAllProucts();
          let filteredProducts = [];
          if (categoryId === "Trending Products" || categoryId === "Best Selling" || categoryId === "Top Rated") {
            filteredProducts = response.products.sort(() => Math.random() - 0.5).slice(0, 10);
          }
          else if (categoryId === "All Products") {
            filteredProducts = response.products;
          } else {
            filteredProducts = response.products.filter(
              (product) => product.group.category === categoryId
            );
          }

          // Apply sorting
          if (sortBy === "priceLowToHigh") {
            filteredProducts.sort((a, b) => a.price - b.price);
          } else if (sortBy === "priceHighToLow") {
            filteredProducts.sort((a, b) => b.price - a.price);
          }

          setProducts(filteredProducts);
        } catch (error) {
          console.log(error);
        }
      };

      fetchProducts();
    }
  }, [categoryId, sortBy, state]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Left side: Filters */}
          <div className="col-span-3 bg-white p-4 rounded-lg shadow-md h-full">
            <div className="mb-4">
              <h4>Sort By:</h4>
              <select value={sortBy} onChange={handleSortChange}>
                <option value="">None</option>
                <option value="priceLowToHigh">Price Low to High</option>
                <option value="priceHighToLow">Price High to Low</option>
              </select>
            </div>
            {/* You can add other filters here */}
          </div>

          <div className="col-span-9 bg-white p-4 rounded-lg shadow-md h-full">
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <div className="grid grid-cols-1">
              {products.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
