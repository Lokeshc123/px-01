import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { createProduct, updateProduct } from '../../../helper/sendData';

const UpdateProductModal = ({ updateShow, setUpdateShow, id }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);


    const handleImageUpload = () => {
        document.getElementById('imageInput').click();

    };





    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            price,
            description,
            category,
            stock,

        };
        console.log("Data", formData);

        try {
            const response = await updateProduct(id, formData);
            if (response.error) {
                console.error(response.error);
                return;
            }
            console.log(response);
            setUpdateShow(false);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Update Product</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setUpdateShow(false)} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block mb-1">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-1">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-1">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="kids wear">Kids Wear</option>
                            <option value="Electronics">Electronics</option>
                            <option value="general">General</option>
                            <option value="men wear">Men Wear</option>
                            <option value="women wear">Women Wear</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock" className="block mb-1">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
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
            </div >
        </div >
    );
};

export default UpdateProductModal;
