import './UnrollBanner.css';

const UnrollBanner = ({value, text}) => {

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