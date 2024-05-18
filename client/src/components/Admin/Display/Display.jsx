import React, { useEffect, useState } from 'react';
import SliderModal from './SliderModal';
import BannerModal from './BannerModal';
import TestimonialModal from './TestimonialModal';
import { getallSlider, getallTestimonial, getallbanner } from '../../../helper/getData';
import { BannerCard, TestimonialCard } from './Cards';

const Display = () => {
    const [showSliderModal, setShowSliderModal] = useState(false);
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [showTestimonialModal, setShowTestimonialModal] = useState(false);
    const [sliders, setSliders] = useState([]);
    const [banners, setBanners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    const fetchData = async () => {
        try {
            const slidersResponse = await getallSlider();
            const bannersResponse = await getallbanner();
            const testimonialsResponse = await getallTestimonial();

            if (slidersResponse.error || bannersResponse.error || testimonialsResponse.error) {
                console.log('Fetching data failed:', slidersResponse.error, bannersResponse.error, testimonialsResponse.error);
                return;
            }

            setSliders(slidersResponse.slider);
            setBanners(bannersResponse.banner);
            setTestimonials(testimonialsResponse.testimonial);
        } catch (error) {
            console.error('Fetching data error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            {showSliderModal && <SliderModal showSliderModal={showSliderModal} setShowSliderModal={setShowSliderModal} />}
            {showBannerModal && <BannerModal showBannerModal={showBannerModal} setShowBannerModal={setShowBannerModal} setBanners={setBanners} />}
            {showTestimonialModal && <TestimonialModal showTestimonialModal={showTestimonialModal} setShowTestimonialModal={setShowTestimonialModal} setTestimonials={setTestimonials} />}

            <div className="flex-1 overflow-y-auto bg-gray-100">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="banner-content text-xl font-bold">Banner</div>
                    <button onClick={() => setShowBannerModal(true)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">New Banner</button>
                </div>
                <div className="container mx-auto px-4 flex flex-wrap justify-center">
                    {banners.map((banner) => (
                        <BannerCard key={banner._id} banner={banner} setBanners={setBanners} />
                    ))}
                </div>
            </div>


            <div className="flex-1 overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Testimonials</h2>
                        <button onClick={() => setShowTestimonialModal(true)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">New Testimonial</button>
                    </div>
                </div>
                <div className="container mx-auto px-4 flex flex-wrap">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial._id} testimonial={testimonial} setTestimonials={setTestimonials} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Display;
