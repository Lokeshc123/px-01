import React, { useState } from 'react';
import { changeRole } from '../../../helper/sendData';

const UserSummary = ({ userData }) => {
    const [roleOptions, setRoleOptions] = useState([
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ]);
    const [selectedRole, setSelectedRole] = useState(userData.role);

    const handleRoleChange = (newValue) => {

        setSelectedRole(newValue);
    };
    const handleRole = async () => {
        if (selectedRole === userData.role) {
            alert('Please select a different role');

        }

        else {
            const data = {
                name: userData.name,
                email: userData.email,
                role: selectedRole
            }
            try {
                const response = await changeRole(userData._id, data);
                console.log(response);
                if (response.error) {
                    alert(response.error);
                }
                else {
                    alert('Role changed successfully');
                }

            }
            catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="flex items-center justify-between border border-gray-300 p-4 rounded-md shadow-md mb-4" >
            <div className="flex items-center">
                <img
                    src={"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg" || userData?.avatar?.url || "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"}
                    alt="User Avatar"
                    className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <div className="flex flex-col">
                    <div className="text-lg font-medium">{userData.name}</div>
                    <div className="text-gray-500">{userData.dateCreated}</div>
                    <div className="text-gray-500">{userData.email}</div>
                </div>
            </div>
            <div className="flex items-center">

                {/* Add a margin-right to separate the select and button */}
                <select
                    className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 mr-4"  /* Add mr-4 here */
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                >
                    {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => handleRole()}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default UserSummary;
