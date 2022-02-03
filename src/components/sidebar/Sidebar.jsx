import React from 'react';

import './sidebar.scss';

const HOURS_IN_DAY = 24;

const Sidebar = () => {
  const hours = Array(HOURS_IN_DAY)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__time-scale">
      {hours.map(hour => (
        <div key={Math.random()} className="time-slot">
          <span className="time-slot__time">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
