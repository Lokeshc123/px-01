import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { addSlider } from '../../../helper/sendData';

const SliderModal = ({ showSliderModal, setShowSliderModal }) => {
    const [images, setImages] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
        console.log('Slider data:', images, title, description);
        e.preventDefault();

        const sliderData = {
            images,
            title,
            description,
        };
        try {
            const response = await addSlider(sliderData);
            if (response.error) {
                console.log('Slider data submission failed:', response.error);
                return;
            }
            console.log('Slider data:', response.slider);
        }
        catch (error) {
            console.error('Slider data submission error:', error);
        }
        setImages('');
        setTitle('');
        setDescription('');
        setShowSliderModal(false);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Slider</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShowSliderModal(false)} />
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
                            onChange={handleImage}
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

export default SliderModal;
