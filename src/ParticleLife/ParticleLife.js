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

    const lss = language.sliderController.subTitles

    const parametersRules = useRef({gravitationDiffColor: [100, lss.gravitationDiffColor],
                                                                gravitationSameColor: [100, lss.gravitationSameColor],
                                                                isManual: false,
                                                                manualDistanceSameColorAttr1: [200, lss.manualDistanceSameColorAttr1],
                                                                manualDistanceSameColorAttr2: [100, lss.manualDistanceSameColorAttr2],
                                                                manualValueSameColorAttr: [80, lss.manualValueSameColorAttr],
                                                                manualDistanceSameColorRep1: [10, lss.manualDistanceSameColorRep1],
                                                                manualDistanceSameColorRep2: [0, lss.manualDistanceSameColorRep2],
                                                                manualValueSameColorRep: [8, lss.manualValueSameColorRep],
                                                                manualDistanceDiffColorAttr1: [100, lss.manualDistanceDiffColorAttr1],
                                                                manualDistanceDiffColorAttr2: [80, lss.manualDistanceDiffColorAttr2],
                                                                manualValueDiffColorAttr: [80, lss.manualValueDiffColorAttr],
                                                                manualDistanceDiffColorRep1: [60, lss.manualDistanceDiffColorAttr1],
                                                                manualDistanceDiffColorRep2: [0, lss.manualDistanceDiffColorAttr2],
                                                                manualValueDiffColorRep: [20, lss.manualValueDiffColorAttr]});

    const parametersParticles = useRef({populationSize: 1000});

    const generateRandomPoints = () => {

        if(canvasRef.current === null){
            return;
        }

        const newPoints = [];
        const pointsInFields = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        const colors = ['#ff55aa', '#aaff55', '#55aaff', '#ffffff'];

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

        const ficu = fields.current
        const newPoints = ficu.map((field, index) => {

            let leftBorder, rightBorder;

            if (index===0){

                leftBorder=0;
            } else {

                leftBorder = index-1;
            }
            if (index===ficu.length-1){

                rightBorder=ficu.length-1;
            } else {

                rightBorder = index+1;
            }

            return field.map(point => {

                // Move points
                point.x += point.velocityX;
                point.y += point.velocityY;

                for(let adjacentCounter = leftBorder; adjacentCounter<=rightBorder; adjacentCounter++) {

                    for (let counter = 0; counter < ficu[adjacentCounter].length; counter++) {
                        const ficuadjcoco = ficu[adjacentCounter][counter]
                        const dltx = ficuadjcoco.x - point.x
                        const dlty = ficuadjcoco.y - point.y
                        
                        const distance = Math.sqrt(Math.pow(dltx, 2) + Math.pow(dlty, 2) + 1e-8);
                        const gravitation = gravitationCalc(distance);
                        const angle = Math.atan2(dlty,dltx);

                        if (point.color !== ficuadjcoco.color) {
                            const pacu = parametersRules.current

                            if(pacu.isManual) {

                                if (distance < pacu.manualDistanceDiffColorRep1[0] && distance >
                                    pacu.manualDistanceDiffColorRep2[0]) {

                                    const newX = point.x - Math.cos(angle) / (pacu.manualValueDiffColorRep[0] + 1e-8);
                                    const newY = point.y - Math.sin(angle) / (pacu.manualValueDiffColorRep[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};

                                }
                                else if (distance < pacu.manualDistanceDiffColorAttr1[0] && distance >
                                    pacu.manualDistanceDiffColorAttr2[0]){

                                    const newX = point.x + Math.cos(angle) / (pacu.manualValueDiffColorAttr[0] + 1e-8);
                                    const newY = point.y + Math.sin(angle) / (pacu.manualValueDiffColorAttr[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};
                                }

                            } else {

                                const newX = point.x - Math.cos(angle) * (gravitation * pacu.gravitationDiffColor[0]);
                                const newY = point.y - Math.sin(angle) * (gravitation * pacu.gravitationDiffColor[0]);

                                point = {...point, x: newX, y: newY};
                            }
                        } else {

                            if(pacu.isManual) {

                                if (distance < pacu.manualDistanceSameColorAttr1[0] && distance >
                                    pacu.manualDistanceSameColorAttr2[0]) {

                                    const newX = point.x + Math.cos(angle) / (pacu.manualValueSameColorAttr[0] + 1e-8);
                                    const newY = point.y + Math.sin(angle) / (pacu.manualValueSameColorAttr[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};

                                }
                                else if (distance < pacu.manualDistanceSameColorRep1[0] && distance >
                                    pacu.manualDistanceSameColorRep2[0]) {

                                    const newX = point.x - Math.cos(angle) / (pacu.manualValueSameColorRep[0] + 1e-8);
                                    const newY = point.y - Math.sin(angle) / (pacu.manualValueSameColorRep[0] + 1e-8);

                                    point = {...point, x: newX, y: newY};
                                }

                            } else {
                                const grav = gravitation * pacu.gravitationSameColor[0]/100
                                const newX = point.x + Math.cos(angle) * (grav);
                                const newY = point.y + Math.sin(angle) * (grav);

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

                const aux = Math.floor((Math.abs(point.x) / canvasRef.current.width) * (ficu.length - 1));

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
