import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';
import RedLine from '../redLine/RedLine';

import './day.scss';

const HOURS_IN_DAY = 24;

const Day = ({ dateDay, dayEvents, onDeleteEvent, onCreateEvent }) => {
  const hours = Array(HOURS_IN_DAY)
    .fill()
    .map((val, index) => index);

  const isToday = dateDay.getDate() === new Date().getDate();

  return (
    <>
      <div className="calendar__day" data-day={dateDay.getDate()}>
        {isToday && <RedLine />}
        {hours.map(hour => {
          const hourEvents = dayEvents.filter(
            event => new Date(event.dateFrom).getHours() === hour,
          );

          return (
            <Hour
              key={dateDay + hour}
              onDeleteEvent={onDeleteEvent}
              onCreateEvent={onCreateEvent}
              dataHour={hour}
              dataDate={dateDay.getTime()}
              hourEvents={hourEvents}
            />
          );
        })}
      </div>
    </>
  );
};

Day.propTypes = {
  dateDay: PropTypes.object.isRequired,
  dayEvents: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
};

export default Day;
