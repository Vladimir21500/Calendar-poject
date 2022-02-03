import React from 'react';
import PropTypes from 'prop-types';

import { getFormatedMonth, months } from '../../utils/dateUtils.js';

import './header.scss';

const Header = ({
  weekDates,
  onCreateEvent,
  onTodayMove,
  onSwitchWeekUp,
  onSwitchWeekDown,
}) => {
  const getDisplayMonth = () => {
    if (weekDates[0].getMonth() === weekDates[6].getMonth()) {
      return getFormatedMonth(weekDates[0]);
    } else {
      return (
        getFormatedMonth(weekDates[0]) + ' - ' + getFormatedMonth(weekDates[6])
      );
    }
  };

  return (
    <header className='header'>
      <button
        className='button create-event-btn'
        onClick={() => onCreateEvent(new Date().getHours(), new Date())}
      >
        <i className='fas fa-plus create-event-btn__icon'></i>Create
      </button>
      <div className='navigation'>
        <button
          className='navigation__today-btn button'
          onClick={() => onTodayMove()}
        >
          Today
        </button>
        <button
          className='icon-button navigation__nav-icon'
          onClick={() => onSwitchWeekDown()}
        >
          <i className='fas fa-chevron-left'></i>
        </button>
        <button
          className='icon-button navigation__nav-icon'
          onClick={() => onSwitchWeekUp()}
        >
          <i className='fas fa-chevron-right'></i>
        </button>
        <span className='navigation__displayed-month'>{getDisplayMonth()}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  weekDates: PropTypes.array.isRequired,
  onCreateEvent: PropTypes.func.isRequired,
  onTodayMove: PropTypes.func.isRequired,
  onSwitchWeekUp: PropTypes.func.isRequired,
  onSwitchWeekDown: PropTypes.func.isRequired,
};

export default Header;
