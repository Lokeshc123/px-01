import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../context/Context";

import { LineChart } from '@mui/x-charts/LineChart';
import { getAllProucts } from '../../../helper/getData';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(UserContext);
    console.log('User:', user);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProucts();
                setProducts(response.products.sort(() => Math.random() - 0.5).slice(0, 5));
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);





    // Dummy data for top-selling products
    const topSellingProducts = [
        { id: 1, name: "Product A", category: "Category A", price: 100, image: "image_url_1" },
        { id: 2, name: "Product B", category: "Category B", price: 150, image: "image_url_2" },
        { id: 3, name: "Product C", category: "Category C", price: 200, image: "image_url_3" },
        { id: 4, name: "Product D", category: "Category D", price: 120, image: "image_url_4" },
        { id: 5, name: "Product E", category: "Category E", price: 180, image: "image_url_5" }
    ];
    const revenueData = [100, 200, 300, 400, 500]; // Sample revenue data
    const profitData = [50, 100, 150, 200, 250]; // Sample profit data

    // X-axis labels
    const xAxisLabels = ["Jan", "Feb", "Mar", "Apr", "May"];


    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <header className="bg-gray-200 p-4 text-center mb-4">
                <h1 className="text-2xl font-semibold">Hello, {user?.name}! Welcome back.</h1>
                <h2 className="text-lg text-gray-700">Let's see how your store is doing.</h2>
            </header>

            {/* Sections */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                {/* Users section */}
                <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                    <h3 className="text-xl font-semibold mb-2">Users</h3>
                    <p className="text-gray-700">Total Users: 1234</p>
                    <p className="text-green-500">+15% Increase</p>
                </div>

                {/* Revenue section */}
                <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                    <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
                    <p className="text-gray-700">$12,345.67</p>
                    <p className="text-green-500">+20% Net Revenue</p>
                </div>

                {/* Profit section */}
                <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                    <h3 className="text-xl font-semibold mb-2">Total Profit</h3>
                    <p className="text-gray-700">$4,567.89</p>
                    <p className="text-green-500">+10% Net Profit</p>
                </div>
            </div>

            {/* Chart section */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h3 className="text-xl font-semibold mb-4">Revenue vs Profit</h3>
                <LineChart
                    xAxis={[{ data: [100, 200, 300, 400, 500, 600] }]}
                    series={[
                        { curve: "catmullRom", data: [100, 180, 300, 250, 500, 650] },
                        { curve: "catmullRom", data: [50, 170, 190, 240, 400, 280] },
                    ]}

                    width={1000}
                    height={300}
                />

            </div>

            {/* Top-selling products table */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h3 className="text-xl font-semibold mb-4">Top-selling Products</h3>
                <table className="w-full ">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-200 mb-2 mx-2"> {/* Added `border-b border-gray-200` class to each row */}
                                <td className="text-center align-middle">
                                    <img
                                        src={product?.images[0]?.url}
                                        alt={product.name}
                                        className="w-20 h-20 mx-auto rounded-lg"
                                    />
                                </td>
                                <td className="text-center align-middle">{product.name}</td>
                                <td className="text-center align-middle">{product.category}</td>
                                <td className="text-center align-middle">${product.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
