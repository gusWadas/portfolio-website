import './Carousel.css';

import React, {useState, useEffect, useCallback} from 'react';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    useEffect(() => {
        // Automatically change images every 3 seconds
        const intervalId = setInterval(() => {
            handleNext();
        }, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentIndex, images.length, handleNext]);

    return (
        <div className="carousel">
            <img src={images[currentIndex]} alt={`Imagem ${currentIndex + 1}`} className='imgCarousel'/>
            <button onClick={handlePrev} className='buttonCarouselLeft'><i className="fas fa-chevron-left"/></button>
            <button onClick={handleNext} className='buttonCarouselRight'><i className="fas fa-chevron-right"/></button>
        </div>
    );
};

export {Carousel};