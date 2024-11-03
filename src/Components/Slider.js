import './Slider.css';
import React, { useState } from 'react';

function Slider({values, sendData}) {
    const [value, setValue] = useState(Number(values[0])); // Initial slider value
    const min = 0;
    const max = 500;

    const handleChange = (event) => {

        setValue(event.target.value);
        sendData(event.target.value);
    };

    return (
        <div className="div-slider">
            <div className="div-text-slider">
                <p>
                    {values[1]}:
                </p>
                <input
                    type="number"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    className="input-number-particles-custom"/>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export {Slider};
