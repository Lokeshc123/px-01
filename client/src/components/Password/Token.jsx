import React, { useState } from 'react';
import { forgetPasswordUser } from '../../helper/sendData';

import { useNavigate } from 'react-router-dom';
const Token = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSendToken = async () => {
        try {
            const user = { email };
            const response = await forgetPasswordUser(user);
            if (response.error) {
                console.error('Token send error:', response.error);
            } else {
                navigate('/reset');
                console.log('Token sent successfully:', response);
                // Handle success case, maybe show a message or navigate to another page
            }
        } catch (error) {
            console.error('Token send error:', error);
        }
    };

    return (
        <div className="login-container min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 rounded-lg shadow-md bg-white px-8 py-6">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
                <form className="space-y-6">
                    <div className="rounded-md">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email-address"
                            name="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleSendToken}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send Token
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Token;
