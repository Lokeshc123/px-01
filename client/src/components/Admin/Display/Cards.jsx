import React, { useContext } from 'react';
import Slider from 'react-slick';
import { deleteBanner, deleteTestimonial } from '../../../helper/sendData';
import { getMyTestimonials, getallTestimonial, getallbanner } from '../../../helper/getData';
import { UserProvider } from '../../../context/Context';
const BannerCard = ({ banner, setBanners }) => {
    const deleteBannerId = async () => {
        try {
            const response = await deleteBanner(banner._id);
            if (response.error) {
                console.log('Delete failed:', response.error);
                return;
            }
            console.log('Delete response:', response.message);
            const newData = await getallbanner();
            if (newData.error) {
                console.log('Fetching data failed:', newData.error);
                return;
            }
            setBanners(newData.banner);
        }
        catch (error) {
            console.error('Delete error:', error);
        }
    }
    return (
        <div className="  mx-4 banner-card-container bg-gray-200 rounded-xl p-4">
            <div className="banner-card flex flex-col justify-center items-center h-full">
                <div className="h-65">
                    <img className="w-40 h-40 object-cover" src={banner.image[0]?.url} alt={banner.title} />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-center items-center">
                    <div className="text-center">
                        <h3 className="text-xl font-bold">{banner.title}</h3>
                        <p className="text-gray-600">{banner.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center w-full">

                        <button onClick={deleteBannerId} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const TestimonialCard = ({ testimonial, setTestimonials, user }) => {


    const deleteTestimonialId = async () => {
        try {
            const response = await deleteTestimonial(testimonial._id);
            if (response.error) {
                console.log('Delete failed:', response.error);
                return;
            }
            console.log('Delete response:', response.message);
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
            setTestimonials(newData.testimonial);
        }
        catch (error) {
            console.error('Delete error:', error);
        }
    }
    return (
        <div className="my-3 mx-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-4">
                    <img
                        src={testimonial?.image[0]?.url}
                        alt=""
                        className="rounded-full w-16 h-16 mx-auto mb-2"
                    />
                    <p className="text-gray-600 text-xs mb-2">{testimonial?.comments}</p>
                    <h1 className="text-lg font-bold text-gray-800 text-center mb-2">{testimonial?.name}</h1>
                    <div className="flex justify-center">
                        <button
                            onClick={deleteTestimonialId}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 text-xs"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export { BannerCard, TestimonialCard };
