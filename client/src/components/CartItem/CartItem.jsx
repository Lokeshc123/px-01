const CartItem = ({ item, onRemoveItem, onQuantityChange }) => {
    return (
        <div className="bg-white rounded shadow-md p-4 flex items-center">
            <div className="image-container mr-4"> {/* Maintained image container class */}
                {item.images && item.images.length > 0 ? (
                    <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="h-32 w-32 object-cover rounded-lg" // Increased image size
                    />
                ) : (
                    <div className="h-32 w-32 flex items-center justify-center rounded-lg bg-gray-200">
                        <p className="text-gray-500">No image available</p>
                    </div>
                )}
            </div>
            <div className="text-container flex flex-col justify-center w-full"> {/* Maintained text container class */}
                <h3 className="font-bold text-lg mb-1 text-center">{item.name}</h3>  {/* Maintained text-center */}
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                    <div className="flex items-center">
                        <button
                            className="text-gray-500 hover:text-red-500 focus:outline-none"
                            onClick={() => onQuantityChange(item.id, -1)}
                        >
                            -
                        </button>
                        <span className="px-2 mx-2 text-gray-700">{item.quantity}</span>
                        <button
                            className="text-gray-500 hover:text-green-500 focus:outline-none"
                            onClick={() => onQuantityChange(item.id, 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <button
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                    onClick={() => onRemoveItem(item._id)} // Pass item id directly
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
