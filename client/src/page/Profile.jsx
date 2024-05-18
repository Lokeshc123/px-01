import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/Context';
import Navbar from '../components/navbar/Navbar'; // Assuming your existing Navbar component
import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import { getAllReviews, getMyOrders, getMyTestimonials, getallTestimonial } from '../helper/getData';
import OrderCard from '../components/OrderCard/OrderCard';
import Cookies from 'universal-cookie';
import MyOrders from '../components/OrderCard/MyOrders';
import ReviewCard from '../components/Review/ReviewCard';
import TestimonialModal from '../components/Admin/Display/TestimonialModal';
import { TestimonialCard } from '../components/Admin/Display/Cards';
import { set } from 'mongoose';

const Profile = () => {
    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('token_auth'); // Ensure removal of token_auth cookie
        setUser(null);
        console.log('User has logged out');
        window.location.href = '/'; // Redirect to home page
    };
    const [testimonials, setTestinomial] = useState([]);

    const [showTestimonialModal, setShowTestimonialModal] = useState(false);

    const { user, setUser } = useContext(UserContext);
    const [reviews, setReviews] = useState([]); // Initial reviews state

    const [selectedOption, setSelectedOption] = useState('my-details'); // Initial selected option

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        const getOrders = async () => {
            try {
                if (!user) {
                    return;
                }
                const response = await getMyOrders(user._id);
                const sortedOrders = response.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            }
            catch (error) {
                console.log(error);
            }
        };
        getOrders();
        const getReviews = async () => {
            try {
                const respone = await getAllReviews(user._id);
                setReviews(respone.reviews);
            }
            catch (error) {
                console.log(error);
            }
        }
        getReviews();
        const getTestinomial = async () => {
            try {
                const response = await getMyTestimonials(user._id);
                setTestinomial(response.testimonial);

            }
            catch (error) {
                console.log(error);
            }
        }
        getTestinomial();
    }, []);
    console.log("Orders", orders)

    const renderContent = () => {
        switch (selectedOption) {
            case 'my-details':
                return <ProfileDetails user={user} />;
            case 'my-orders':
                return (
                    <div className="my-orders">
                        {/* Assuming orders data is fetched and stored in a state variable called orders */}
                        {orders.length > 0 ? (
                            <MyOrders orders={orders} setOrders={setOrders} />
                        ) : (
                            <p className="text-center">No orders found.</p>
                        )}
                    </div>

                );
            case 'reviews-ratings':
                return (
                    <div>
                        <div className="bg-gray-100 p-4 mb-4">
                            <h2 className="text-lg font-semibold mb-4">Your Reviews</h2>
                            <div className="flex flex-wrap">
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <ReviewCard
                                            key={review.productId}
                                            review={review}
                                        />
                                    ))
                                ) : (
                                    <p className="text-center">No reviews found.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-100 p-4 mb-4">
                            {showTestimonialModal && <TestimonialModal setShowTestimonialModal={setShowTestimonialModal} setTestimonial={setTestinomial} />}
                            <div className="bg-gray-100 p-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold mb-0">Your Testimonials</h2>
                                <button
                                    onClick={() => {
                                        setShowTestimonialModal(true);
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    New Testimonial
                                </button>
                            </div>
                            {testimonials.length > 0 && (
                                <div className="flex flex-wrap">
                                    {testimonials.map((testimonial) => (
                                        <TestimonialCard
                                            key={testimonial.id}
                                            testimonial={testimonial}
                                            setTestimonials={setTestinomial}
                                            user={user}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>


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
        <>
            <Navbar />
            <div className="container mx-auto flex flex-row h-screen" style={{ padding: 0 }}>
                <div className="navbar w-1/4 bg-gray-200 shadow-md p-4 overflow-y-auto h-screen">
                    <ul className="space-y-2">

                        <li
                            className={`cursor-pointer hover:bg-gray-300 py-2 px-4 rounded-md ${selectedOption === 'my-details' ? 'bg-gray-300' : ''
                                }`}
                            onClick={() => handleOptionClick('my-details')}
                        >
                            My Details
                        </li>
                        <li
                            className={`cursor-pointer hover:bg-gray-300 py-2 px-4 rounded-md ${selectedOption === 'my-orders' ? 'bg-gray-300' : ''
                                }`}
                            onClick={() => handleOptionClick('my-orders')}
                        >
                            My Orders
                        </li>
                        <li
                            className={`cursor-pointer hover:bg-gray-300 py-2 px-4 rounded-md ${selectedOption === 'my-addresses' ? 'bg-gray-300' : ''
                                }`}
                            onClick={() => handleOptionClick('reviews-ratings')}
                        >
                            Reviews & Ratings
                        </li>
                        <li
                            className={`cursor-pointer hover:bg-gray-300 py-2 px-4 rounded-md ${selectedOption === 'additional-settings' ? 'bg-gray-300' : ''
                                }`}
                            onClick={() => handleOptionClick('logout')}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
                <div className="content w-3/4 px-2 py-4 overflow-y-auto h-screen">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default Profile;
