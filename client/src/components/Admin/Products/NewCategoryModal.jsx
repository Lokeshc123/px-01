import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { addCategory } from '../../../helper/sendData';

const NewCategoryModal = ({ show, setShow }) => {
    const [name, setName] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the category object
        const categoryData = {
            name,
            subcategories,
        };
        try {
            const response = await addCategory(categoryData);
            if (response.error) {
                console.error(response.error);
                return;
            }
            console.log(response);

        }
        catch (error) {
            console.error(error);
        }


        setShow(false);
    };

    const handleAddSubcategory = () => {
        // Add an empty string to the subcategories state for a new subcategory input
        setSubcategories([...subcategories, ""]);
    };

    const handleRemoveSubcategory = (index) => {
        // Filter out the subcategory at the given index from the state
        const newSubcategories = [...subcategories];
        newSubcategories.splice(index, 1);
        setSubcategories(newSubcategories);
    };

    const handleChangeSubcategory = (e, index) => {
        // Update the subcategory value at the given index based on user input
        const newSubcategories = [...subcategories];
        newSubcategories[index] = e.target.value;
        setSubcategories(newSubcategories);
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm ${show ? '' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Category</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShow(false)} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="categoryName" className="block mb-1">Category Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subcategory" className="block mb-1">Subcategories</label>
                        {subcategories.map((subcategory, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={subcategory}
                                    onChange={(e) => handleChangeSubcategory(e, index)}
                                    className="border rounded-md px-3 py-2 mr-2"
                                    placeholder={`Subcategory ${index + 1}`} // Add placeholder for better UX
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSubcategory(index)}
                                    className="text-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSubcategory} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Add Subcategory
                        </button>
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

export default NewCategoryModal;
