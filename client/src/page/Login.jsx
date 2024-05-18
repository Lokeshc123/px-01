import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { forgetPasswordUser, login } from '../helper/sendData';
import { UserContext } from '../context/Context';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '../helper/getData';

const Login = () => {
    const cookies = new Cookies();

    const [show, setShow] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleForgotPassword = () => {
        setShow(true); // Set show to true when user clicks "Forgot your password?"
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        const response = await login(user);
        if (response.error) {
            console.error('Login error:', response.error);

        } else {

            console.log('response:', response.token);
            cookies.set('token_auth', response.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            setUser(response.user);
            console.log('Login successful:', response);
            navigate('/');
        }

    };



    return (

        <div className="login-container min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 rounded-lg shadow-md bg-white px-8 py-6">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                    <div className="rounded-md">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">

                            <button onClick={() => navigate(`/token`)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    xmlns="http://www.w3.org/2000/svg"

                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.293 6.707a1 1 0 011.414 0L10 11.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                    <div className="mt-6 text-sm text-center">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
