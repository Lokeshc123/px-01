import React from 'react';

const ReviewCard = ({ review }) => {



    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 mx-3">
            <h3 className="text-lg font-semibold mb-2">{review.productName}</h3>
            <p className="text-gray-600 mb-2">Reviewer: {review.review.name}</p>
            <p className="text-gray-600 mb-2">Rating: {review.review.rating}</p>
            <p className="mb-4">Comment: {review.review.comment}</p>

        </div>
    );
};

export default ReviewCard;
