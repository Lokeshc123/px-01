import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { updateUser } from '../../helper/sendData';
import ChangePassword from '../../page/modal/ChangePassword';


const ProfileDetails = ({ user }) => {
    const [name, setName] = useState(user?.name || "Login Please");
    const [email, setEmail] = useState(user?.email || "Login Please");
    const [images, setImages] = useState();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ message: '', severity: 'success' });

    const updateProfile = async () => {
        try {
            const data = {
                name: name,
                email: email,
                avatar: images,
            };
            const response = await updateUser(data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImages(reader.result);
        };
    };

    const handleAlertMessage = (messageDetails) => {
        setAlertMessage(messageDetails);
        setShowAlert(true);
    };

    return (
        <div className="flex flex-col space-y-4">
            {showAlert && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alertMessage.severity} onClose={() => setShowAlert(false)}>
                        {alertMessage.message}
                    </Alert>
                </Stack>
            )}
            <div className="flex items-center mb-4">
                <img src={user?.avatar?.url || "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"} alt="User avatar" className="w-32 h-32 rounded-full object-cover" />
                <label htmlFor="avatar-upload" className="bg-transparent text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-2 ml-4">
                    Change Avatar
                </label>
                <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    hidden
                    onChange={handleImage}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="font-bold text-gray-700">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-bold text-gray-700">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex space-x-4 justify-center">
                <button
                    onClick={updateProfile}
                    className="bg-primary py-2 px-4 rounded-md text-white hover:bg-secondary transition-colors duration-200"
                >
                    Save Changes
                </button>
                <button
                    onClick={() => setShowChangePassword(true)}
                    className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-700 transition-colors duration-200"
                >
                    Change Password
                </button>
            </div>
            {showChangePassword && (
                <ChangePassword setShowChangePassword={setShowChangePassword} setAlertMessage={handleAlertMessage} />
            )}
        </div>
    );
};

export default ProfileDetails;
