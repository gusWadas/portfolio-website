import './SliderController.css';

import {Slider} from './Slider';
import {useState, useRef, Fragment} from "react";
import {SwitchButton} from "./SwitchButton";

const SliderController = ({list, title, sendList}) => {

    const childData = useRef(list);
    const [advancedSettings, setAdvancedSettings] = useState(false);

    const handleChildData = (key) => (data) => {

        childData.current = {
            ...childData.current,
            [key]: [data, childData.current[key]?.[1]],
        };

        sendList(childData.current);
    };

    const handleSwitch = (key) => (event) => {

        setAdvancedSettings(event);

        console.log(childData.current);

        childData.current = {
            ...childData.current,
            [key]: event,
        };

        sendList(childData.current);
    }

    return (
        <div className="body-slider-controller">
            <h2>{title[0]}</h2>
            <div className="line-slider-controller"/>
            <p>{title[1]}</p>
            <SwitchButton sendData={handleSwitch("isManual")}/>
            <div className="line-slider-controller"/>
            {advancedSettings ? (
                <div className="body-slider-controller-text-div">
                    {Object.entries(list).slice(3, 15).map(([key, topic]) => (
                        <Fragment key={key}>
                            <Slider values={topic} sendData={handleChildData(key)}/>
                            <div className="line-summary"/>
                        </Fragment>
                    ))}
                </div>
            ) : (
                <div className="body-slider-controller-text-div">
                    {Object.entries(list).slice(0, 2).map(([key, topic]) => (
                        <Fragment key={key}>
                            <Slider values={topic} sendData={handleChildData(key)}/>
                            <div className="line-summary"/>
                        </Fragment>
                    ))}
                </div>
            )
            }
        </div>
    );
}

export {SliderController};