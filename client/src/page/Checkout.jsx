import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Context';
import { takeOrder } from '../helper/sendData';

const CheckoutPage = () => {
    const { cart, setCart, user } = useContext(UserContext);
    const [total, setTotal] = useState(0.0);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [country, setCountry] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        cart.forEach(item => total += item.price * item.quantity);
        setTotal(total);
    }, [cart]);

    const handleOrderSubmit = async () => {
        try {
            console.log("Processing payment (dummy)...");
            const orderItems = cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item?.images?.[0]?.url || "abc",
                product: item._id
            }));

            const completeOrder = {
                shippingAddress: {
                    address,
                    city,
                    phoneNo,
                    pinCode,
                    country
                },
                orderItems,
                totalPrice: total,
                user: user._id,
                paymentInfo: {
                    id: 'dummy-payment-id',
                    status: 'success',
                },
            };

            const response = await takeOrder(completeOrder);
            console.log("Order response:", response);
            if (response.success) {
                setCart([]);
                setCurrentStep(3);
                alert("Order placed successfully!");
            } else {
                throw new Error(response.error || "Order placement failed");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order. Please try again.");
        }
    };

    const handleNextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            handleOrderSubmit();
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold md:text-3xl">Checkout</h1>
                    <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-center ${currentStep === 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            Shipping
                        </div>
                        <div className={`px-2 py-1 rounded-full text-center ${currentStep === 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            Payment
                        </div>
                        <div className={`px-2 py-1 rounded-full text-center ${currentStep === 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                            Confirmation
                        </div>
                    </div>
                </div>
                {currentStep === 1 && (
                    <div>
                        <h2>Shipping Address</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                                <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City</label>
                                    <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" required />
                                </div>
                                <div>
                                    <label htmlFor="phoneNo" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                                    <input type="tel" id="phoneNo" name="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="pinCode" className="block text-gray-700 font-bold mb-2">Postal Code (PIN Code)</label>
                                    <input type="text" id="pinCode" name="pinCode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" required />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country</label>
                                    <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" required />
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleNextStep} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">Next</button>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <h2>Payment Information (Dummy)</h2>
                        <p className="text-gray-500">This is a dummy payment section for demonstration purposes. Real payment gateways would be integrated here.</p>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">Card Number</label>
                                <input type="text" id="cardNumber" name="cardNumber" placeholder="**** **** **** ****" className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="expiryDate" className="block text-gray-700 font-bold mb-2">Expiry Date (MM/YY)</label>
                                    <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-gray-700 font-bold mb-2">CVV</label>
                                    <input type="text" id="cvv" name="cvv" placeholder="***" className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">Previous</button>
                            <button onClick={handleOrderSubmit} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">Confirm Order</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
