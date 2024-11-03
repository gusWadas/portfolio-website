import React, { useState, useEffect } from 'react';
import './UnrollBanner.css';

const UnrollBanner = ({value, text}) => {
    /*const [isUnrolled, setIsUnrolled] = useState(false);

    const handleMouseEnter = () => {
        setIsUnrolled(true);
    };

    const handleMouseLeave = () => {
        setIsUnrolled(false);
    };*/

    /*useEffect(() => {
        const timer = setTimeout(() => {
            setIsUnrolled(true);
        }, 1000); // Adjust the delay as needed
        return () => clearTimeout(timer);
    }, []);*/

    return (
        <div className="divPosition">
            <div className="banner">
                <div className="bannerText">
                    <p>{text}</p>
                </div>
                <img src={value} alt="Logo"/>
            </div>
            <div className="bannerEdge"/>
        </div>
    );
};

export {UnrollBanner};