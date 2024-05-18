import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { addBanner } from '../../../helper/sendData';
import { getallbanner } from '../../../helper/getData';

const BannerModal = ({ showBannerModal, setShowBannerModal, setBanners }) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return; // Handle empty file selection

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result); // Set single image URL
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bannerData = {
            image,
            title,
            description,
        };

        // Implement logic to handle banner data submission (e.g., send to backend)
        try {
            const response = await addBanner(bannerData);
            if (response.error) {
                console.log('Banner data submission failed:', response.error);
                return;
            }
            console.log('Banner data:', response.banner);
            const newData = await getallbanner();
            if (newData.error) {
                console.log('Fetching data failed:', newData.error);
                return;
            }
            setBanners(newData.banner);

        }
        catch (error) {
            console.error('Banner data submission error:', error);
        }

        // Reset form state after submission
        setImage('');
        setTitle('');
        setDescription('');
        setShowBannerModal(false);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Banner</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShowBannerModal(false)} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                        <label htmlFor="image" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Image</label>

                        <input
                            type="file"
                            id="image"
                            accept="image/*" // Allow only image files
                            onChange={handleImageChange}
                            style={{ display: 'none' }} // Hide input field visually
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

export default BannerModal;
