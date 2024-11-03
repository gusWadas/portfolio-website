import './ImagesSwitcher.css';
import './ImagesSwitcherCores.css';
import React, {useState, useEffect} from "react";

const ImagesSwitcher = ({images, className = '', background = 'third', ...props}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState("") // vazia, left ou right


    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleAnimationEnd = () => {
        if (animating === "") {
            return;
        }

        switch(animating){

            case "left":
                handleNext();
                break;

            case "right":
                handlePrev();
                break;

            default:
                break;
        }

        setAnimating("");
    }

    const runAnimation = (data) => {
        setAnimating(data)
    }

    useEffect(() => {
        // Automatically change images every 3 seconds
        const intervalId = setInterval(() => {
            runAnimation("right");
        }, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentIndex, images.length]);

    return (
        <div className={"block-image " + className} {...props}>
            <div className={`block-image0 ${background}-background-color-${(currentIndex + 2) % 3} ${animating !== '' ? 'animated2-' + animating : ''}`}
                 onAnimationEnd={handleAnimationEnd}>
                <div className={`block-image0 ${background}-background-color-${(currentIndex + 1) % 3}`}>
                    <img src={images[(currentIndex + 1) % 3]} alt="Imagem-teste"/>
                    <div
                        className={`block-image0 ${background}-background-color-${currentIndex} ${animating === 'right' ? 'animated1-right' : ''}`}>
                        <img src={images[currentIndex]}
                             alt="Imagem-teste"/>
                        <div
                            className={`block-image-invisible div-invisible ${background}-background-color-${(currentIndex + 2)%3} ${animating === 'left' ? 'animated1-left' : ''}`}
                            style={{
                                display: animating === 'left' ? 'flex' : 'none',
                            }}>
                            <img src={images[(currentIndex + 2) % 3]} alt="image-invisible" className="img-invisible"
                                 style={{
                                     display: animating === 'left' ? 'block' : 'none',
                                 }}/>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={() => runAnimation("left")} className='button-switcher-left'><i
                className="fas fa-chevron-left"/></button>
            <button onClick={() => runAnimation("right")} className='button-switcher-right'><i
                className="fas fa-chevron-right"/></button>
        </div>
    );
}

export {ImagesSwitcher};