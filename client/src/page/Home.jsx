import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from '../components/navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Products from '../components/Products/Products';
import TopProducts from '../components/TopProducts/TopProducts';
import Banner from '../components/Banner/Banner';
import Testimonials from '../components/Testimonial/Testimonial';

import { getUser } from '../helper/getData';
import Cookies from 'universal-cookie';
import { UserContext } from '../context/Context';
const Home = () => {
    const cookies = new Cookies();
    const { user, setUser } = React.useContext(UserContext);
    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);


    return (
        <div>
            <Navbar />
            <Hero />
            <Products />
            <TopProducts />
            <Banner />
            <Testimonials />
        </div>
    )
}

export default Home