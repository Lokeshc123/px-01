import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { createProduct } from '../../../helper/sendData';
import { getAllCategory, getAllProucts } from '../../../helper/getData';

const NewProductModal = ({ show, setShow, setProducts }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await getAllCategory();
                if (response.error) {
                    console.error(response.error);
                    return;
                }
                console.log(response);
                setCategories(response.categories);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllCategories();
    }, []);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImages([...images, reader.result]);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            price,
            description,
            stock,
            images,
            group: {
                category,
                subCategory: selectedSubcategory,
            } // Include the selected subcategory
        };


        try {
            const response = await createProduct(formData);
            if (response.error) {
                console.error(response.error);
                return;
            }
            console.log(response);
            const newData = await getAllProucts();
            if (newData.error) {
                console.error(newData.error);
                return;
            }
            setProducts(newData.products);
            setShow(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        // Find the selected category object
        const selectedCategoryObject = categories.find(cat => cat.name === selectedCategory);

        // Update the subcategories state based on the selected category
        if (selectedCategoryObject) {
            setSubcategories(selectedCategoryObject.subcategories);
            setSelectedSubcategory(''); // Clear selected subcategory when changing category
        } else {
            setSubcategories([]);
            setSelectedSubcategory('');
        }
    };

    const handleSubcategoryChange = (e) => {
        const selectedSubcat = e.target.value;
        setSelectedSubcategory(selectedSubcat);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Product</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShow(false)} />
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
                            onChange={handleCategoryChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    {subcategories.length > 0 && (
                        <div className="mb-4">
                            <label htmlFor="subcategory" className="block mb-1">Subcategory</label>
                            <select
                                id="subcategory"
                                value={selectedSubcategory}
                                onChange={handleSubcategoryChange}
                                className="w-full border rounded-md px-3 py-2"
                                required
                            >
                                <option value="">Select Subcategory</option>
                                {subcategories.map((subcat, index) => (
                                    <option key={index} value={subcat}>{subcat}</option>
                                ))}
                            </select>
                        </div>
                    )}
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
                    <div className="mb-4">
                        <label htmlFor="imageInput">Upload Image</label>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*" // Allow only image files
                            onChange={handleImage}
                            multiple // Allow multiple file selection
                            style={{ display: 'none' }}
                        />

                        {images.length > 0 && (
                            <div className="flex flex-wrap mt-4">
                                {images.map((image, index) => (
                                    <div key={index} className="mr-2 mb-2">
                                        <img
                                            src={image} // Use object URL for preview
                                            alt={`Product ${index}`}
                                            className="w-32 h-32 object-cover rounded-md"
                                            style={{
                                                objectFit: 'cover',
                                                width: '100px',
                                                height: '100px'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
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

export default NewProductModal;
