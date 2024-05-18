import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { resetUserPassword } from '../../helper/sendData';
import Cookies from 'universal-cookie';
const Reset = () => {

    const cookies = new Cookies();
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async () => {

        try {
            // Validate inputs
            if (!token || !newPassword || !confirmPassword) {
                console.error('All fields are required.');
                return;
            }
            if (newPassword !== confirmPassword) {
                console.error('Passwords do not match.');
                return;
            }
            const data = {
                password: newPassword,
                confirmPassword,
            }
            const response = await resetUserPassword(token, data);
            if (response.error) {
                console.error('Password reset error:', response.error);
            } else {
                cookies.set('token_auth', response.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                navigate('/');


            }
        } catch (error) {
            console.error('Password reset error:', error);
        }
    };

    return (
        <div className="login-container min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 rounded-lg shadow-md bg-white px-8 py-6">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="rounded-md">
                        <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                            Token
                        </label>
                        <input
                            type="text"
                            id="token"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </div>
                    <div className="rounded-md">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="rounded-md">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reset;
