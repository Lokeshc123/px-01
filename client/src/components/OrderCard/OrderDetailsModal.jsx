import React from 'react';
import { IoMdClose } from 'react-icons/io';

const OrderDetailsModal = ({ order, setShow }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-[80vh] mt-12 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Order Details</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShow(false)} />
                </div>
                <div>
                    <p><strong>Created At:</strong> {formatDate(order.createdAt)} {formatTime(order.createdAt)}</p>
                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                    <p><strong>Paid At:</strong> {formatDate(order.paidAt)} {formatTime(order.paidAt)}</p>
                    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                    <p><strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pinCode}, {order.shippingAddress.country}</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Order Items</h3>
                    {order.orderItems.map((item, index) => (
                        <div key={index} className="border border-gray-300 rounded-md p-4 mt-2">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Price:</strong> ${item.price}</p>
                            <img src={item.image} alt={item.name} className="w-32 h-32 object-contain rounded-md mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
