import React, { useState } from 'react';
import { changeStatusOrder } from '../../../helper/sendData';

const OrderSummary = ({ orderData }) => {
    console.log("Order Data ", orderData);
    const [statusOptions, setStatusOptions] = useState([
        { value: 'Processing', label: 'Processing' },
        { value: 'Shipping', label: 'Shipping' },
        { value: 'Delivered', label: 'Delivered' },
    ]);
    const [selectedStatus, setSelectedStatus] = useState(orderData.orderStatus);

    const handleStatusChange = (newValue) => {
        // Implement logic to update the order status (e.g., make an API call)
        setSelectedStatus(newValue);
    };
    const handleStatus = async () => {
        if (selectedStatus === orderData.status) {
            alert('Please select a different status');
        } else {
            const data = {
                status: selectedStatus,
            };
            try {
                const response = await changeStatusOrder(orderData._id, data);
                console.log(response);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="order-summary-container mb-4">
            <div className="flex items-center justify-between border border-gray-300 p-4 rounded-md shadow-md">
                <div className="flex items-center">
                    {orderData.orderItems.map((item, index) => (
                        <img key={index} src={item?.image || ""} alt="Order Item" className="w-16 h-16 object-cover rounded-md shadow-md mr-4" />
                    ))}
                    <div>
                        <div className="font-bold mb-2">{orderData.date}</div>
                        <div>{orderData.address}</div>
                        <div className="font-bold">Total Price: ${orderData.totalPrice}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition-colors duration-300"
                        onClick={() => handleStatus()}
                    >
                        Change Status
                    </button>
                    {statusOptions && (
                        <select
                            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4"
                            value={selectedStatus}
                            onChange={(e) => handleStatusChange(e.target.value)}
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
