import React, { useEffect, useState } from "react";
import Img1 from "../../assets/Img/shirt.png";
import Img2 from "../../assets/Img/shirt2.png";
import Img3 from "../../assets/Img/shirt3.png";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllProucts } from "../../helper/getData";


const TopProducts = () => {
  const [ProductsData, setProductsData] = useState([]);
  useEffect(() => {
    const fetch3Products = async () => {
      try {
        const response = await getAllProucts();
        setProductsData(response.products.sort(() => Math.random() - 0.5).slice(0, 3));

        console.log(response.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetch3Products();
  }, []);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* image section */}
              <div className="h-[100px]">
                <img
                  src={data.images && data.images[0] && data.images[0].url ? data.images[0].url : ""}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* details section */}
              <div className="p-4 text-center">
                {/* star rating */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={() => handleClick(data._id)}
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;