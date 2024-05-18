import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { getMyTestimonials, getallTestimonial } from '../../../helper/getData';
import { UserContext } from '../../../context/Context';
import { addTestimonial } from '../../../helper/sendData';


const TestimonialModal = ({ showTestimonialModal, setShowTestimonialModal, setTestimonial }) => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [comments, setComments] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return; // Handle empty file selection

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result); // Set single image URL
        };
    };
    const { user } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const testimonialData = {
            image,
            name,
            comments,
            user: user._id

        };

        try {
            const response = await addTestimonial(testimonialData);
            if (response.error) {
                console.log('Testimonial data submission failed:', response.error);
                return;
            }
            console.log('Testimonial data:', response.testimonial);
            let newData;
            if (user.role === 'admin') {
                newData = await getallTestimonial();
            }
            else {
                newData = await getMyTestimonials(user._id);
            }
            if (newData.error) {
                console.log('Fetching data failed:', newData.error);
                return;
            }
            setTestimonial(newData.testimonial);

        }
        catch (error) {
            console.error('Testimonial data submission error:', error);
        }

        // Reset form state after submission
        setImage('');
        setName('');
        setComments('');
        setShowTestimonialModal(false);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Testimonial</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShowTestimonialModal(false)} />
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
                        <label htmlFor="comments" className="block mb-1">Comments</label>
                        <textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
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

export default TestimonialModal;
