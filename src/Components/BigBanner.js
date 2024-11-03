import './BigBanner.css'

const BigBanner = ({text, list}) => {

    const scrollToDiv = (data) => () => {

        //document.getElementById(data).style.scrollBehavior = "smooth";
        document.getElementById(data).scrollIntoView({block: 'center', behavior: 'smooth'});
    };

    return (
        <div className="big-banner">
            <div className="inner-div-title-big-banner">
                {Array.from(text).map((letter, index) => (
                    <p key={index} className="big-banner-title">{letter}</p>
                ))}
            </div>
            <div className="inner-div-text-big-banner">
                {list.map((topic, index)=>(
                    <>
                        <p key={index} className="big-banner-text" onClick={scrollToDiv("topic"+index)}>{topic}</p>
                        <div className="line-big-banner"/>
                    </>
                ))}
            </div>
        </div>
    );
};

export { BigBanner };