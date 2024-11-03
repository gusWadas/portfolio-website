import './MainPage.css';
import data_ptbr from '../Others/text_ptbr_main.json';
import data_en from '../Others/text_en_main.json';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import {UnrollBanner} from '../Components/UnrollBanner';
import {Summary} from '../Components/Summary';
import {SwitchButton} from "../Components/SwitchButton";
import {Carousel} from "../Components/Carousel";
import {ImagesSwitcher} from "../Components/ImagesSwitcher";
import {Footer} from '../Components/Footer';

import image1 from "../Images/Arts/VelhoOeste.png";
import image2 from "../Images/Arts/Sapo.png";
import image3 from "../Images/Arts/Aurelion_Smol.png";

import particle1 from "../Images/Particle Life/Image1.png";
import particle2 from "../Images/Particle Life/Image2.png";
import particle3 from "../Images/Particle Life/Image3.png";

import robot1 from "../Images/Evolutionary Robotic Arm/Image1.png";
import robot2 from "../Images/Evolutionary Robotic Arm/Image2.png";
import robot3 from "../Images/Evolutionary Robotic Arm/Image3.png";

function MainPage() {

    const [data, setData] = useState(data_en);
    const imagesBanner = [image1, image2, image3];
    const imagesParticle = [particle1, particle2, particle3];
    const imagesRobot = [robot1, robot2, robot3];

    const handleSwitch = (event) => {

        event ? setData(data_ptbr) : setData(data_en);
    }

    // const scrollToDiv = (data) => () => {
    //
    //     document.getElementById(data).scrollIntoView({block: 'center', behavior: 'smooth'});
    // };

    return (
        <>
            <div className="App">
                <div className="fixed-content-right">
                    <Summary list={data.summary.items} title={data.summary.title} />
                </div>
                <div className="fixed-content-left">
                    <Link
                        to="https://github.com/BernaTameirao"
                        className="link-custom"
                        target="_blank"><UnrollBanner value={"https://cdn-icons-png.flaticon.com/512/25/25231.png"}
                                  text={data.iconsText.github}/></Link>
                    <Link
                        to="https://bernardo-t.itch.io/"
                        className="link-custom"
                        target="_blank"><UnrollBanner value={"https://static.itch.io/images/itchio-textless-black.svg"}
                                  text={data.iconsText.itch}/></Link>
                    <Link
                        to=""
                        className="link-custom"
                        target="_blank"><UnrollBanner value={"https://cdn-icons-png.flaticon.com/512/87/87390.png"}
                                            text={data.iconsText.instagram}/></Link>
                    <Link
                        to="https://www.linkedin.com/in/btameirao/"
                        className="link-custom"
                        target="_blank"><UnrollBanner value={"https://cdn-icons-png.freepik.com/256/254/254394.png?semt=ais_hybrid"}
                                  text={data.iconsText.linkedin}/></Link>
                </div>

                <div className="true-background">


                    <div className="first-background">
                        <div className="lateral-div"></div>
                        <div className="central-div">
                            <Carousel images={imagesBanner}/>
                        </div>
                        <div className="lateral-div">
                            <div className="switch-div">
                                <img
                                    src="https://static-00.iconduck.com/assets.00/united-states-emoji-512x370-1qkq6uv6.png"
                                    alt="bandeira-eua"/>
                                <SwitchButton sendData={handleSwitch}/>
                                <img
                                    src="https://static-00.iconduck.com/assets.00/brazil-emoji-2048x1480-z2fhxkde.png"
                                    alt="bandeira-brasil"/>
                            </div>
                        </div>
                    </div>



                    <div className="second-background">
                        <h1>{data.intro.title}</h1>
                        <div className="line"/>
                        <div className="row-div" id="topic0">
                            <div className="block-text">
                                <p>{data.intro.pt1.split("<br/>").map((line, index) => (
                                    <>
                                        {line}
                                        <br/>
                                    </>
                                ))}</p>
                            </div>
                            <div className="block-text">
                                <p>{data.intro.pt2.split("<br/>").map((line, index) => (
                                    <>
                                        {line}
                                        <br/>
                                    </>
                                ))}</p>
                            </div>
                        </div>
                        <div className="line"/>



                        <h2>{data.aboutMe.mainTitle}</h2>
                        <div className="row-div" id="topic1">
                            {data.aboutMe.chapters1.map((chapter, chapterIndex) => (
                                <>
                                <div className="block-text" key={chapterIndex}>
                                    <h3>{chapter.title}</h3>
                                    {chapter.topics.map((topic, topicIndex) => (
                                        <div key={topicIndex}>
                                            <h4>{topic.title}</h4>
                                            <p>{topic.text}</p>
                                        </div>
                                    ))}
                                </div>
                                {chapterIndex%2===0?
                                    (<hr/>):(<></>)
                                }
                                </>
                            ))}
                        </div>
                        <div className="row-div" id="topic1">
                            {data.aboutMe.chapters2.map((chapter, chapterIndex) => (

                                <>
                                    <div className="block-text" key={chapterIndex}>
                                        <h3>{chapter.title}</h3>
                                        {chapter.topics.map((topic, topicIndex) => (
                                            <div key={topicIndex}>
                                                <h4>{topic.title}</h4>
                                                <p>{topic.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {chapterIndex%2===0?
                                        (<hr/>):(<></>)
                                    }
                                </>
                            ))}
                        </div>
                    </div>



                    <div className="third-background">
                        <div className="lateral-div"/>
                        <div className="central-div2">
                            <Link to="/particles" className="link-custom"><h1>{data.particleLife.mainTitle}</h1></Link>
                            <div className="row-div" id="topic2">
                                <div className="block-text">
                                    <p>
                                        {data.particleLife.text.split("<br/>").map((line, index) => (
                                        <>
                                            {line}
                                            <br/>
                                        </>
                                    ))}
                                        <Link to="/particles" className="link-custom-2" >{data.particleLife.mainTitle}</Link>
                                    </p>
                                </div>
                                <ImagesSwitcher images={imagesParticle} background={"third"}/>
                            </div>
                        </div>
                        <div className="lateral-div"/>
                    </div>



                    <div className="second-background">
                        <h1>{data.evolutionaryRobot.mainTitle}</h1>
                        <div className="row-div" id="topic3">
                            <ImagesSwitcher images={imagesRobot} background={"second"}/>
                            <div className="block-text">
                                <p>
                                    {data.evolutionaryRobot.text.split("<br/>").map((line, index) => (
                                        <>
                                            {line}
                                            <br/>
                                        </>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export {MainPage};