import './ParticleLife.css'
import React, {useCallback, useEffect, useRef, useState} from 'react';

import data_ptbr from '../Others/text_ptbr_particle.json';
import data_en from '../Others/text_en_particle.json';

import {SliderController} from "../Components/SliderController";

function ParticleLife() {

    const [points, setPoints] = useState([]);
    const canvasRef = useRef(null);
    const fields = useRef([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    const [language, setLanguage] = useState(data_en);
    //const mouseCoords = useRef({x: -1, y: -1});

    const parametersRules = useRef({gravitationDiffColor: [100, language.sliderController.subTitles.gravitationDiffColor],
                                                                gravitationSameColor: [100, language.sliderController.subTitles.gravitationSameColor],
                                                                isManual: false,
                                                                manualDistanceSameColorAttr1: [200, language.sliderController.subTitles.manualDistanceSameColorAttr1],
                                                                manualDistanceSameColorAttr2: [100, language.sliderController.subTitles.manualDistanceSameColorAttr2],
                                                                manualValueSameColorAttr: [80, language.sliderController.subTitles.manualValueSameColorAttr],
                                                                manualDistanceSameColorRep1: [10, language.sliderController.subTitles.manualDistanceSameColorRep1],
                                                                manualDistanceSameColorRep2: [0, language.sliderController.subTitles.manualDistanceSameColorRep2],
                                                                manualValueSameColorRep: [8, language.sliderController.subTitles.manualValueSameColorRep],
                                                                manualDistanceDiffColorAttr1: [100, language.sliderController.subTitles.manualDistanceDiffColorAttr1],
                                                                manualDistanceDiffColorAttr2: [80, language.sliderController.subTitles.manualDistanceDiffColorAttr2],
                                                                manualValueDiffColorAttr: [80, language.sliderController.subTitles.manualValueDiffColorAttr],
                                                                manualDistanceDiffColorRep1: [60, language.sliderController.subTitles.manualDistanceDiffColorAttr1],
                                                                manualDistanceDiffColorRep2: [0, language.sliderController.subTitles.manualDistanceDiffColorAttr2],
                                                                manualValueDiffColorRep: [20, language.sliderController.subTitles.manualValueDiffColorAttr]});

    const parametersParticles = useRef({populationSize: 1000});

    const generateRandomPoints = () => {

        if(canvasRef.current === null){
            return;
        }

        const newPoints = [];
        const pointsInFields = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        const colors = ['#ff5252', '#58ff58', '#4781ff', '#ffffff'];

        for (let i = 0; i < parametersParticles.current.populationSize; i++) {

            const colorIndex = Math.floor(Math.random() * colors.length);
            newPoints.push({
                x: Math.random() * canvasRef.current.width,
                y: Math.random() * canvasRef.current.height,
                color: colors[colorIndex],
                /*velocityX: Math.random()/20 -0.025,
                velocityY: Math.random()/20 -0.025,*/
                velocityX: Math.random() / 2 -0.4,
                velocityY: Math.random() / 2 -0.4,
            });

            const aux = Math.floor((newPoints[i].x/canvasRef.current.width)*(fields.current.length-1));
            pointsInFields[aux].push(newPoints[i]);
        }
        setPoints(newPoints);
        fields.current = pointsInFields;
    };

    // const movePoints = () => {
    //
    //     const pointsInFields = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    //
    //     const updatedPoints = points.map(point => {
    //
    //         const distance = Math.sqrt(Math.pow(point.x - mouseCoords.current.x, 2) + Math.pow(point.y - mouseCoords.current.y, 2));
    //
    //         if (distance < 100) { // Change this value to adjust the sensitivity
    //             const angle = Math.atan2(mouseCoords.current.y - point.y, mouseCoords.current.x - point.x);
    //             const newX = point.x - Math.cos(angle) /2;
    //             const newY = point.y - Math.sin(angle) /2;
    //
    //             return { ...point, x: newX, y: newY};
    //         }
    //
    //         const aux = Math.floor((Math.abs(point.x) / canvasRef.current.width) * (fields.current.length - 1));
    //
    //         pointsInFields[aux].push(point);
    //
    //         return point;
    //     });
    //
    //     fields.current = pointsInFields;
    //     setPoints(updatedPoints);
    // }

    const idleMovement = useCallback(() => {

        if(canvasRef.current === null){
            return;
        }

        const pointsInFields = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

        const gravitationCalc = (distance) => {

            return Math.min(1/(Math.pow(distance, 2) + 1e-8), 2);
        }

        const newPoints = fields.current.map((field, index) => {

            let leftBorder, rightBorder;

            if (index===0){

                leftBorder=0;
            } else {

                leftBorder = index-1;
            }
            if (index===fields.current.length-1){

                rightBorder=fields.current.length-1;
            } else {

                rightBorder = index+1;
            }

            return field.map(point => {

                // Move points
                point.x += point.velocityX;
                point.y += point.velocityY;

                for(let adjacentCounter = leftBorder; adjacentCounter<=rightBorder; adjacentCounter++) {

                    for (let counter = 0; counter < fields.current[adjacentCounter].length; counter++) {

                        const distance = Math.sqrt(Math.pow(fields.current[adjacentCounter][counter].x - point.x, 2)
                                                                + Math.pow(fields.current[adjacentCounter][counter].y - point.y, 2) + 1e-8);
                        const gravitation = gravitationCalc(distance);
                        const angle = Math.atan2(fields.current[adjacentCounter][counter].y - point.y,
                                                            fields.current[adjacentCounter][counter].x - point.x);

                        if (point.color !== fields.current[adjacentCounter][counter].color) {

                            if(parametersRules.current.isManual) {

                                if (distance < parametersRules.current.manualDistanceDiffColorRep1[0] && distance >
                                    parametersRules.current.manualDistanceDiffColorRep2[0]) {

                                    const newX = point.x - Math.cos(angle) / (parametersRules.current.manualValueDiffColorRep[0] + 1e-8);
                                    const newY = point.y - Math.sin(angle) / (parametersRules.current.manualValueDiffColorRep[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};

                                }
                                else if (distance < parametersRules.current.manualDistanceDiffColorAttr1[0] && distance >
                                    parametersRules.current.manualDistanceDiffColorAttr2[0]){

                                    const newX = point.x + Math.cos(angle) / (parametersRules.current.manualValueDiffColorAttr[0] + 1e-8);
                                    const newY = point.y + Math.sin(angle) / (parametersRules.current.manualValueDiffColorAttr[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};
                                }

                            } else {

                                const newX = point.x - Math.cos(angle) * (gravitation * parametersRules.current.gravitationDiffColor[0]);
                                const newY = point.y - Math.sin(angle) * (gravitation * parametersRules.current.gravitationDiffColor[0]);

                                point = {...point, x: newX, y: newY};
                            }
                        } else {

                            if(parametersRules.current.isManual) {

                                if (distance < parametersRules.current.manualDistanceSameColorAttr1[0] && distance >
                                    parametersRules.current.manualDistanceSameColorAttr2[0]) {

                                    const newX = point.x + Math.cos(angle) / (parametersRules.current.manualValueSameColorAttr[0] + 1e-8);
                                    const newY = point.y + Math.sin(angle) / (parametersRules.current.manualValueSameColorAttr[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};

                                }
                                else if (distance < parametersRules.current.manualDistanceSameColorRep1[0] && distance >
                                    parametersRules.current.manualDistanceSameColorRep2[0]) {

                                    const newX = point.x - Math.cos(angle) / (parametersRules.current.manualValueSameColorRep[0] + 1e-8);
                                    const newY = point.y - Math.sin(angle) / (parametersRules.current.manualValueSameColorRep[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};
                                }

                            } else {

                                const newX = point.x + Math.cos(angle) * (gravitation * parametersRules.current.gravitationSameColor[0]/100);
                                const newY = point.y + Math.sin(angle) * (gravitation * parametersRules.current.gravitationSameColor[0]/100);

                                point = {...point, x: newX, y: newY};
                            }
                        }
                    }
                }

                // Bounce off the walls
                if (point.x < 0) {

                    point.x = canvasRef.current.width;
                } else if (point.x >= canvasRef.current.width){

                    point.x=0;
                }

                if (point.y < 0) {

                    point.y = canvasRef.current.height;
                } else if( point.y >= canvasRef.current.height){

                    point.y = 0;
                }

                const aux = Math.floor((Math.abs(point.x) / canvasRef.current.width) * (fields.current.length - 1));

                pointsInFields[aux].push(point);

                return point;

            });

        });

        fields.current = pointsInFields;
        setPoints(newPoints.flatMap(innerArray => innerArray));

        requestAnimationFrame(idleMovement);

    }, []);

    useEffect(() => {

        const getLanguage = () => {

            const aux = JSON.parse(localStorage.getItem('language'));

            aux === true ? setLanguage(data_ptbr) : setLanguage(data_en);
        }

        getLanguage();

        generateRandomPoints();

        idleMovement();
        console.log("B");

    }, [idleMovement]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        /*const updateMouseCoords = (e) => {

            mouseCoords.current = {x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop}
        }*/

        const createPoints = () => {

            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw points
            points.forEach(point => {

                context.fillStyle = point.color;
                context.beginPath();
                context.arc(point.x, point.y, 3, 0, Math.PI * 2);
                context.fill();
            });
        }

        createPoints();

        /*(canvas.addEventListener('mousemove', updateMouseCoords);

        return () => {

            canvas.removeEventListener('mousemove', updateMouseCoords);
        }*/

    }, [points]);

    const handleListData = (data) => {

        parametersRules.current = data;
    }


    return (
        <div className="background-particles">
            <div className="fixed-content-particles">
                <SliderController list={parametersRules.current} title={[language.sliderController.title, language.sliderController.advSettings]} sendList={handleListData} />
            </div>
            <canvas ref={canvasRef} width={"1650"} height={"800"}/>
        </div>
    );
}

export {ParticleLife};
