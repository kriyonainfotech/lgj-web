import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, } from 'react-icons/fi';

const banners = [
    '/banner/banner1.png',
    '/banner/banner2.png',
    '/banner/banner3.png'
];

export default function BannerSlider() {
    const [current, setCurrent] = useState(0);
    const total = banners.length;

    const nextSlide = () => setCurrent((current + 1) % total);
    const prevSlide = () => setCurrent((current - 1 + total) % total);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 5000); // changes slide every 5 sec

        return () => clearInterval(interval); // cleanup on unmount
    }, [total]);


    return (
        <section className="w-full aspect-[13/6] overflow-hidden relative">
            {/* Slide */}
            <div
                className="w-full h-full bg-cover bg-[center_50%] transition-all duration-700"
                style={{ backgroundImage: `url(${banners[current]})` }}
            />

            {/* Arrows */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl text-white bg-black/30 hover:bg-black/50 p-2 rounded-full z-10"
                onClick={prevSlide}
            >
                <FiChevronLeft />
            </button>

            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl text-white bg-black/30 hover:bg-black/50 p-2 rounded-full z-10"
                onClick={nextSlide}
            >
                <FiChevronRight />
            </button>
        </section>
    );
}
