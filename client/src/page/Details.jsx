import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../helper/getData';
import { UserContext } from '../context/Context';
import NewReview from './modal/NewReview';

const Details = () => {
    const [showNewReview, setShowNewReview] = useState(false);
    const { cart, setCart } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1); // Initial quantity
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductDetails(id);
                setProduct(response.product);
                if (response.product.group && response.product.group.category === "Electronics") {
                    // Set color options if category is "Electronics"
                    setOptions(["Black", "Blue", "Red"]);
                    setSelectedOption("Black"); // Set default selected option
                } else {
                    // Set size options for other categories
                    setOptions(["XS", "S", "M", "L", "XL"]);
                    setSelectedOption("XS"); // Set default selected option
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        setCart([...cart, { ...product, quantity, selectedOption }]);
        navigate(`/cart`);
    };

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(quantity + value, 1);
        setQuantity(newQuantity);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleGiveReview = () => {
        // Handle review submission (consider using a modal or form component)
        console.log('Review submitted!');
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow">
                {showNewReview && <NewReview setShowNewReview={setShowNewReview} id={id} setProduct={setProduct} />}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:max-w-screen-xl lg:mx-auto px-4 lg:p-8">
                    <div className="flex justify-center lg:mr-8">
                        <div className="w-full lg:w-3/5"> {/* Increased image area */}
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="rounded-lg border border-gray-300 object-contain lg:w-96 h-auto"
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            {product.reviews && product.reviews.length > 0 && (
                                <div className="flex flex-col justify-start mt-4">
                                    <h4 className="text-lg font-semibold mb-2">Reviews</h4>
                                    {product.reviews.slice(0, 2).map((review, index) => (
                                        <div key={index} className="border border-gray-300 rounded-md p-4 mb-2">
                                            <p className="font-semibold">{review.name}</p>
                                            <p className="text-gray-600">Rating: {review.rating}</p>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                    {product.reviews.length > 2 && (
                                        <p className="text-sm text-blue-500 cursor-pointer">View all reviews</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="flex flex-col justify-center lg:w-2/5"> {/* Increased content area */}
                        <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.category}</p>
                        <p className="text-gray-600 mb-2 font-bold">${product.price}</p>
                        <p className="text-sm mt-4 mb-8">{product.description}</p>

                        {options && (
                            <div className="mb-4">
                                <label className="mr-2 text-gray-700 font-medium">Options:</label>
                                <select
                                    value={selectedOption}
                                    onChange={(e) => handleOptionChange(e.target.value)}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 font-medium"
                                >
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex items-center mb-4">
                            <button
                                className="text-gray-500 hover:text-red-500 focus:outline-none px-2 font-medium"
                                onClick={() => handleQuantityChange(-1)}
                            >
                                -
                            </button>
                            <span className="px-3 text-gray-700 font-medium">{quantity}</span>
                            <button
                                className="text-gray-500 hover:text-green-500 focus:outline-none px-2 font-medium"
                                onClick={() => handleQuantityChange(1)}
                            >
                                +
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handleAddToCart}
                                className="btn bg-blue-500 text-white py-2 px-4 rounded-md font-medium"
                            >
                                Add to Cart ({quantity})
                            </button>

                            <button
                                onClick={() => setShowNewReview(true)}
                                className="btn bg-green-500 text-white py-2 px-4 rounded-md font-medium"
                            >
                                Give Review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
