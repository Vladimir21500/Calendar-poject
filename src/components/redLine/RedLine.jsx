import React, { useEffect, useState } from 'react';

import './redLine.scss';

const MINS_IN_HOUR = 60;
const MILLISECONDS_IN_MIN = 60 * 1000;

const RedLine = () => {
  const minutes = new Date().getMinutes();

  const [redLineStyle, setStyle] = useState({
    marginTop: new Date().getHours() * MINS_IN_HOUR + minutes - 2,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStyle({
        marginTop: new Date().getHours() * MINS_IN_HOUR + minutes - 2,
      });
    }, MILLISECONDS_IN_MIN);

    return () => {
      clearInterval(intervalId);
    };
  });

  return <div style={redLineStyle} className="red-line"></div>;
};

export default RedLine;
