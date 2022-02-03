import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { createEvent, deleteEvent, fetchEventInfo } from './gateway/gateWay';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

import './common.scss';

const MILLS_IN_MIN = 1000 * 60;

const App = () => {
  const [events, setEvents] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState(generateWeekRange(getWeekStartDate(weekStartDate)));
  const [isShowModal, setIsShowModal] = useState(false);
  const [dateInfoForDefault, setdateInfoForDefault] = useState([new Date().getHours(), new Date()]);

  useEffect(() => {
    setWeekDates(generateWeekRange(getWeekStartDate(weekStartDate)));
  }, [weekStartDate]);

  const updateEvents = () => {
    fetchEventInfo().then(events => {
      setEvents(events);
    });
  };

  useEffect(() => {
    updateEvents();
  }, []);

  const onCreateEvent = (hour, date) => {
    setIsShowModal(true);
    setdateInfoForDefault([+hour, date]);
  };

  const onTodayMove = () => {
    setWeekStartDate(new Date());
  };

  const onSwitchWeekUp = () => {
    const plusSevenDay = weekStartDate.setDate(weekStartDate.getDate() + 7);
    setWeekStartDate(new Date(plusSevenDay));
  };

  const onSwitchWeekDown = () => {
    const minusSevenDay = weekStartDate.setDate(weekStartDate.getDate() - 7);
    setWeekStartDate(new Date(minusSevenDay));
  };

  const onDeleteEvent = id => {
    const { dateFrom } = events.find(event => event.id === id);
    if (
      Math.abs(dateFrom / MILLS_IN_MIN - new Date().getTime() / MILLS_IN_MIN) < 15 &&
      dateFrom > new Date().getTime()
    ) {
      alert('cannot be deleted, the event will start soon');
      return;
    }

    deleteEvent(id).then(() => {
      updateEvents();
    });
  };

  const onHideModal = () => {
    setIsShowModal(false);
  };

  const onSubmitModal = eventInfo => {
    let isContradicEvents = false;

    events.forEach(({ dateFrom, dateTo }) => {
      if (eventInfo.dateFrom < dateTo && eventInfo.dateTo > dateFrom) {
        alert('events contradict');
        isContradicEvents = true;
      }
    });

    if (isContradicEvents) return;

    createEvent(eventInfo).then(() => {
      updateEvents();
    });
    setIsShowModal(false);
  };

  return (
    <>
      <Header
        weekDates={weekDates}
        onCreateEvent={onCreateEvent}
        onTodayMove={onTodayMove}
        onSwitchWeekUp={onSwitchWeekUp}
        onSwitchWeekDown={onSwitchWeekDown}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        isShowModal={isShowModal}
        dateInfoForDefault={dateInfoForDefault}
        onCreateEvent={onCreateEvent}
        onHideModal={onHideModal}
        onSubmitModal={onSubmitModal}
        onDeleteEvent={onDeleteEvent}
      />
    </>
  );
};

export default App;
