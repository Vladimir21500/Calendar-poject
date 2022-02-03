import React from 'react';
import PropTypes from 'prop-types';

import './event.scss';

const Event = ({ height, marginTop, id, title, time, onDeleteEvent }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const clickHandler = (event) => {
    event.stopPropagation();

    onDeleteEvent(event.target.dataset.id);
  };

  return (
    <div
      data-id={id}
      style={eventStyle}
      className='event'
      onClick={clickHandler}
    >
      <div data-id={id} className='event__title'>
        {title}
      </div>
      <div data-id={id} className='event__time'>
        {time}
      </div>
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};

export default Event;
