import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { addReview } from '../../helper/sendData';
import { getProductDetails } from '../../helper/getData';
// You may need to create a helper function for sending review data

const NewReview = ({ setShowNewReview, id, setProduct }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the review object
        const reviewData = {
            productId: id,
            rating,
            comment,
        };
        try {
            const response = await addReview(reviewData);
            if (response.error) {
                console.error(response.error);
                return;
            }
            const newData = await getProductDetails(id);
            if (newData.error) {
                console.error(newData.error);
                return;
            }
            setProduct(newData.product);
            console.log(response);

        }
        catch (error) {
            console.error(error);
        }

        setShowNewReview(false);
        setName('');
        setRating(0);
        setComment('');
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Review</h2>
                    <IoMdClose className="cursor-pointer" onClick={() => setShowNewReview(false)} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="reviewerName" className="block mb-1">Your Name</label>
                        <input
                            type="text"
                            id="reviewerName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block mb-1">Rating (out of 5)</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            min="0"
                            max="5"
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block mb-1">Comment</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            rows="4"
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

export default NewReview;
