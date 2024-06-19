import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="text-center text-sm">Copyright &copy; 2024 Your Company Name</p>
            <div className="flex justify-center items-center space-x-4 mt-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-gray-700">About Us</a>
                <span>|</span>
                <a href="#" className="text-gray-500 hover:text-gray-700">Contact</a>
            </div>
        </footer>
    );
};

export default Footer;
