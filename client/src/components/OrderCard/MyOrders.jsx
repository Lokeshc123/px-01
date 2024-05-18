import React, { useContext, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { deleteOrder } from '../../helper/sendData';
import OrderDetailsModal from './OrderDetailsModal';

const MyOrders = ({ orders, setOrders }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);



    const onDeleteOrder = async (orderId) => {
        try {
            const response = await deleteOrder(orderId);
            if (response.error) {
                setMessage(response.error);

            }
            else {
                console.log(response);
                const updatedOrders = orders.filter(order => order._id !== orderId);
                setOrders(updatedOrders);
                setMessage(response.message);
            }
            setShowAlert(true);
        }
        catch (error) {
            setMessage(error.message);
            setShowAlert(true);
            console.log(error);
        }
    }
    const [order, setOrder] = useState({});
    const handleViewDetails = (order) => {
        setOrder(order);
        setShow(true);
    }

    return (
        <div className="my-orders">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            {show && <OrderDetailsModal show={show} setShow={setShow} order={order} />}
            {showAlert && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning" onClose={() => setShowAlert(false)}>
                        {message}
                    </Alert>
                </Stack>
            )}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{order._id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{order.orderStatus}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-4">
                                <button className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleViewDetails(order)}>
                                    View Details
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => onDeleteOrder(order._id)}>
                                    Cancel Order
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
