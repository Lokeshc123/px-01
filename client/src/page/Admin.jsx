import React, { useState, useEffect, useContext } from 'react';
import { MdDashboard, MdPeopleOutline, MdPieChartOutline, MdInventory2 } from 'react-icons/md';
import { FaShoppingBag } from 'react-icons/fa';
import { getAllOrders, getAllProucts, getAllUsers, getUser } from '../helper/getData';
import OrderSummary from '../components/Admin/Orders/OrderSummary';
import UserSummary from '../components/Admin/Users/UserSummary';
import ProductInventoryList from '../components/Admin/Products/ProductInventoryList';
import Dashboard from '../components/Admin/Dashboard/Dashboard';
import NewProductModal from '../components/Admin/Products/NewProductModal';
import Cookies from "universal-cookie";
import { UserContext } from '../context/Context';
import Display from '../components/Admin/Display/Display';
import { FaDisplay } from "react-icons/fa6";

import { jwtDecode } from 'jwt-decode';
import { CiLogout } from "react-icons/ci";
import NewCategoryModal from '../components/Admin/Products/NewCategoryModal';
const Admin = () => {
    const cookies = new Cookies();
    const { user, setUser } = useContext(UserContext);
    const [selectedOption, setSelectedOption] = useState('dashboard'); // Initial selected option
    const [orders, setOrders] = useState([]); // State to store orders
    const [users, setUsers] = useState([]); // State to store users
    const [products, setProducts] = useState([]); // State to store products
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [productsPerPage] = useState(3); // Number of products per page
    const [show, setShow] = useState(false);
    const [showNewCategory, setShowNewCategory] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };


    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('token_auth'); // Ensure removal of token_auth cookie
        setUser(null);
        console.log('User has logged out');
        window.location.href = '/'; // Redirect to home page
    };
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = cookies.get('token_auth');
                console.log('Token:', token);
                if (token) {
                    const decoded = jwtDecode(token);
                    const response = await getUser(decoded.id);
                    console.log('User details:', response.user);
                    if (response.user.role !== 'admin') {
                        window.location.href = '/'; // Redirect to home page if user is not admin
                        return;
                    }
                    setUser(response.user);
                } else {
                    window.location.href = '/'; // Redirect to home page if no token is found
                }
            } catch (error) {
                console.error('Token not found:', error);
            }
        };
        fetchDetails();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                setOrders(response.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.Users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchAllProducts = async () => {
            try {
                const response = await getAllProucts();
                setProducts(response.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchOrders();
        fetchUsers();
        fetchAllProducts();
    }, []);

    const renderProducts = () => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);
        return paginatedProducts.map((product) => (
            <ProductInventoryList key={product.id} product={product} setProducts={setProducts} />
        ));
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'dashboard':
                return <Dashboard />;
            case 'orders':
                return (
                    <div className="flex flex-col">
                        {orders.map((order) => (
                            <OrderSummary key={order.id} orderData={order} />
                        ))}
                    </div>
                );
            case 'users':
                return (
                    <div className="flex flex-col">
                        {users.map((user) => (
                            <UserSummary key={user.id} userData={user} />
                        ))}
                    </div>
                );
            case 'products':
                return (
                    <div className="flex flex-col">
                        {show && <NewProductModal show={show} setShow={setShow} setProducts={setProducts} />}
                        {showNewCategory && <NewCategoryModal show={showNewCategory} setShow={setShowNewCategory} />}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Products</h2>
                            <div>
                                <button className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4" onClick={() => setShow(true)}>
                                    Add New Product
                                </button>
                                <button onClick={() => setShowNewCategory(true)} className="btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700" >
                                    Add New Category
                                </button>
                            </div>
                        </div>
                        {renderProducts()}
                        {products.length > productsPerPage && (
                            <nav className="flex justify-center mt-4">
                                <button
                                    className={`btn bg-gray-200 text-gray-600 py-2 px-4 rounded-md mr-2 ${currentPage === 1 ? 'disabled' : ''
                                        }`}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </button>
                                <button
                                    className={`btn bg-gray-200 text-gray-600 py-2 px-4 rounded-md ${products.length > currentPage * productsPerPage ? '' : 'disabled'
                                        }`}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </nav>
                        )}
                    </div>
                );
            case 'display': // New case for 'display'
                return (
                    <div className="flex flex-col">
                        <Display />
                    </div>
                );
            case 'logout':
                handleLogout();
                return null;
            default:
                return null;
        }
    };

    return (
        <div className="container flex flex-row min-h-screen" style={{ padding: 0 }}>
            <nav className="w-1/5 bg-blue-400 text-white font-semibold px-4 py-4">
                <ul className="space-y-2">
                    <li
                        className={`flex items-center cursor-pointer hover:bg-blue-500 py-2 px-4 rounded-md ${selectedOption === 'dashboard' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => handleOptionClick('dashboard')}
                    >
                        <MdDashboard className="text-xl mr-2" />
                        Dashboard
                    </li>
                    <li
                        className={`flex items-center cursor-pointer hover:bg-blue-500 py-2 px-4 rounded-md ${selectedOption === 'orders' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => handleOptionClick('orders')}
                    >
                        <FaShoppingBag className="text-xl mr-2" />
                        Orders
                    </li>
                    <li
                        className={`flex items-center cursor-pointer hover:bg-blue-500 py-2 px-4 rounded-md ${selectedOption === 'users' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => handleOptionClick('users')}
                    >
                        <MdPeopleOutline className="text-xl mr-2" />
                        Users
                    </li>
                    <li
                        className={`flex items-center cursor-pointer hover:bg-blue-500 py-2 px-4 rounded-md ${selectedOption === 'products' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => handleOptionClick('products')}
                    >
                        <MdInventory2 className="text-xl mr-2" />
                        Products
                    </li>
                    <li
                        className={`flex items-center cursor-pointer hover:bg-blue-500 py-2 px-4 rounded-md ${selectedOption === 'display' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => handleOptionClick('display')}
                    >
                        <FaDisplay className='text-xl mr-2' />
                        Display
                    </li>
                    <li
                        className={`flex items-center cursor-pointer hover:bg-blue-500 py-2 px-4 rounded-md ${selectedOption === 'logout' ? 'bg-blue-500' : ''
                            }`}
                        onClick={() => handleOptionClick('logout')}
                    >
                        <CiLogout className="text-xl mr-2" />
                        Log Out
                    </li>
                </ul>
            </nav>
            <main className="flex-grow bg-gray-100 p-4">{renderContent()}</main>
        </div>
    );
};

export default Admin;
