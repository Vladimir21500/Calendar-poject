import React from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

import './hour.scss';

const MIN_IN_MILLISECONDS = 1000 * 60;

const Hour = ({ dataHour, dataDate, hourEvents, onDeleteEvent, onCreateEvent }) => {
  const clickHandler = event => {
    const time = event.target.dataset.time;
    const date = new Date(+event.target.dataset.date);
    onCreateEvent(time, date);
  };

  return (
    <div
      onClick={clickHandler}
      className="calendar__time-slot"
      data-time={dataHour}
      data-date={dataDate}
    >
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const formatedDateFrom = new Date(dateFrom);
        const formatedDateTo = new Date(dateTo);

        const eventStart = `${formatedDateFrom.getHours()}:${formatMins(
          formatedDateFrom.getMinutes(),
        )}`;
        const eventEnd = `${formatedDateTo.getHours()}:${formatMins(formatedDateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            onDeleteEvent={onDeleteEvent}
            height={(formatedDateTo.getTime() - formatedDateFrom.getTime()) / MIN_IN_MILLISECONDS}
            marginTop={formatedDateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataDate: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
};

export default Hour;
