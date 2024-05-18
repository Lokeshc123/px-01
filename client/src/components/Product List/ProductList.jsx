import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${product._id}`);
    };

    return (
        <div key={product.id} className="product-item mb-4 px-4 w-full">  {/* Added horizontal padding for spacing */}
            <div className="container mx-auto">  {/* Added container for appropriate width and centering */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="image-container col-span-2 md:col-span-3">
                        <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="h-48 w-48 object-cover rounded-lg mr-2"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className="details col-span-10 md:col-span-9 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="text-gray-500">${product.price}</p>
                            <p className="text-sm mt-2 text-gray-600">{product.description}</p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => handleClick()}
                                className="btn bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-md text-lg font-semibold"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
