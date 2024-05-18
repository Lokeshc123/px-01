import React from 'react';

const OrderCard = ({ order }) => {
    console.log("Order ", order);
    // Check if order is undefined
    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-card flex flex-col md:flex-row md:shadow-md rounded-md bg-white">
            <div className="image-container w-full md:w-1/3 flex items-center justify-center">

                <img
                    key={order._id}
                    src={order.image || ""}
                    alt={order.name}
                    className="h-48 w-48 object-cover rounded-lg"
                />

            </div>
            <div className="order-details flex-1 p-2 md:p-4">
                <div className="flex justify-between mb-2">
                    <p className="text-lg font-semibold">Order Status: {order.orderStatus}</p>
                    <p className="text-gray-500">{new Date(order.date).toLocaleDateString('en-GB')}</p>
                </div>
                <div className="flex flex-col mb-4">
                    <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
                    <p className="text-gray-500">{order.shippingAddress?.address}</p>
                    <p className="text-gray-500">{order.shippingAddress?.city}, {order.shippingAddress?.pinCode}</p>
                    <p className="text-gray-500">{order.shippingAddress?.country}</p>
                    <p className="text-gray-500">{order.shippingAddress?.phoneNo}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Total Price: ₹{order.totalPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
