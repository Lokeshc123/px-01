import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { changePassword } from '../../helper/sendData';

const ChangePassword = ({ setShowChangePassword, setAlertMessage }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setAlertMessage({ message: 'Passwords do not match', severity: 'error' });
            return;
        }
        const data = {
            oldPassword: currentPassword,
            confirmPassword: confirmNewPassword,
            newPassword: newPassword,
        };
        try {
            const response = await changePassword(data);
            if (response.error) {
                setAlertMessage({ message: response.error, severity: 'error' });
            } else {
                setAlertMessage({ message: 'Password changed successfully', severity: 'success' });
                setShowChangePassword(false);
            }
        } catch (error) {
            setAlertMessage({ message: error.message, severity: 'error' });
        }

        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Change Password</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShowChangePassword(false)} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block mb-1">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block mb-1">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmNewPassword" className="block mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
