import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/Img/logo.png'
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";

import DarkMode from './DarkMode';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import Cookie from 'universal-cookie';
import { BiUserCircle } from 'react-icons/bi';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../../helper/getData';
import { getSearchedProducts } from '../../helper/sendData';
const Navbar = () => {

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = cookies.get('token_auth');
                console.log('Token:', token);
                if (token) {
                    const decoded = jwtDecode(token);
                    console.log('Decoded:', decoded);
                    const response = await getUser(decoded.id);
                    console.log('Response:', response);
                    if (response && response.user) {
                        console.log('User details:', response.user);
                        if (response.user.role === 'admin') {
                            setUser(response.user);
                            navigate('/admin');
                        } else {
                            setUser(response.user);
                        }
                    } else {
                        console.error('User not found in response:', response);
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchDetails();
    }, []);
    const cookies = new Cookie();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const Options = [
        {
            id: 1,
            name: "Home",
            link: "/#",
        },
        {
            id: 2,
            name: "Top Rated",
            link: "/category/Top Rated",
        },
        {
            id: 3,
            name: "Kids Wear",
            link: "/category/Kids Wear",

        },
        {
            id: 4,
            name: "Mens Wear",
            link: "/category/Men Wear",

        },
        {
            id: 5,
            name: "Electronics",
            link: "/category/Electronics",
        },
    ];
    const DropdownLinks = [
        {
            id: 1,
            name: "Trending Products",
            link: "/category/Trending Products",
        },
        {
            id: 2,
            name: "Best Selling",
            link: "/category/Best Selling",
        },
        {
            id: 3,
            name: "Top Rated",
            link: "/category/Top Rated",
        },
    ];
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (searchTerm) {
            try {
                const response = await getSearchedProducts(searchTerm); // Make request to backend API
                const { products } = response.data;
                const search = "searchTerm";
                // Redirect to search page with query param
                navigate(`/category/${search}`, { state: { products } });
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        }
    };
    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
            {/* Upper Navbar */}
            <div className="bg-primary/40 py-2">
                <div className="container flex justify-between items-center">
                    <div>
                        <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                            <img src={Logo} alt="Logo" className='w-10' />
                            Sleekify
                        </a>
                    </div>
                    {/* Search and cart option */}
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <form onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <IoMdSearch
                                    onClick={handleSearchSubmit}
                                    className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3"
                                />
                            </form>
                        </div>
                        <button
                            onClick={() => navigate(`/cart`)}
                            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
                        >
                            <span className="group-hover:block hidden transition-all duration-200">
                                Cart
                            </span>
                            <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
                        </button>

                        {user ? ( // Check if user is logged in

                            <button
                                onClick={() => navigate('/profile')} // Navigate to profile page
                                className="flex items-center gap-[2px] py-2 bg-transparent border border-primary hover:bg-primary/20 hover:text-primary rounded-full px-3 focus:outline-none focus:border-2 focus:border-primary">
                                <BiUserCircle className="text-xl text-primary drop-shadow-sm" />
                            </button>

                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-transparent border border-primary hover:bg-primary/20 hover:text-primary px-4 py-1 rounded-md text-sm font-medium flex items-center gap-1"
                            >
                                <span>Sign In</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Lower Navbar */}
            <div data-aos="zoom-in" className="flex justify-center">
                <ul className="sm:flex hidden items-center gap-4">
                    {Options.map((data) => (
                        <li key={data.id}>
                            <button
                                onClick={() => {

                                    navigate(data.link);
                                }}

                                className="inline-block px-4 hover:text-primary duration-200"
                            >
                                {data.name}
                            </button>
                        </li>
                    ))}
                    {/* Simple Dropdown and Links */}
                    <li className="group relative cursor-pointer">
                        <a href="#" className="flex items-center gap-[2px] py-2">
                            Trending Products
                            <span>
                                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                            </span>
                        </a>
                        <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                            <ul>
                                {DropdownLinks.map((data) => (
                                    <li key={data.id}>
                                        <button
                                            onClick={() => {
                                                navigate(data.link);
                                            }}
                                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                                        >
                                            {data.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar