import React, { useState } from 'react';
import './SwitchButton.css';

const SwitchButton = ({sendData}) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {

    sendData(!isOn);
    setIsOn(!isOn);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
};

export {SwitchButton};
