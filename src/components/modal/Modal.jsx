import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { formatMins, getDateTime } from '../../utils/dateUtils';

import './modal.scss';

const MIN_IN_HOUR = 60;

const Modal = ({ dateInfoForDefault, onHideModal, onSubmitModal }) => {
  const [hours, date] = dateInfoForDefault;
  const year = date.getFullYear();
  const month = formatMins(date.getMonth() + 1);
  const day = formatMins(date.getDate());

  const [eventData, setEventData] = useState({
    title: '',
    date: `${year}-${month}-${day}`,
    dateFrom: `${formatMins(hours)}:00`,
    dateTo: `${formatMins(hours + 1)}:00`,
    description: '',
  });
  const [classNames, setClassNames] = useState({
    title: 'event-form__field_invalid',
    date: 'event-form__field',
    dateFrom: 'event-form__field',
    dateTo: 'event-form__field',
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [messageError, setMessageError] = useState('enter title please');

  const validateTitle = value => {
    if (value) {
      setMessageError('');
      setClassNames({
        ...classNames,
        title: 'event-form__field',
      });
      return true;
    }

    setMessageError('enter title please');
    setClassNames({
      ...classNames,
      title: 'event-form__field_invalid',
    });
    return false;
  };

  const validateTime = (name, value) => {
    const mins = +value.split(':')[1];

    if (mins % 15 === 0) {
      setClassNames({
        ...classNames,
        [name]: 'event-form__field',
      });
      return true;
    }

    setMessageError('minutes must be a multiple of 15');
    setClassNames({
      ...classNames,
      [name]: 'event-form__field_invalid',
    });
    return false;
  };

  const validateDataEvent = () => {
    const { dateFrom, dateTo } = eventData;
    const [hourFrom, minutesFrom] = dateFrom.split(':').map(el => +el);
    const [hourTo, minutesTo] = dateTo.split(':').map(el => +el);

    if (hourFrom > hourTo) {
      setMessageError('incorrect date');
      return false;
    }
    if (hourFrom === hourTo && minutesFrom > minutesTo) {
      setMessageError('incorrect date');
      return false;
    }
    if (hourFrom === hourTo && minutesFrom === minutesTo) {
      setMessageError('incorrect date');
      return false;
    }

    const duration = hourTo * MIN_IN_HOUR + minutesTo - hourFrom * MIN_IN_HOUR + minutesFrom;

    if (duration > MIN_IN_HOUR * 6) {
      setMessageError('too long event');
      return false;
    }

    return true;
  };

  const validateField = (name, value) => {
    if (name === 'title') {
      return validateTitle(value);
    }
    if (name === 'dateFrom') {
      return validateTime(name, value);
    }
    if (name === 'dateTo') {
      return validateTime(name, value);
    }

    return true;
  };

  const validate = () => {
    const entriesEvent = Object.entries(eventData);
    const isValidArr = entriesEvent
      .map(([name, value]) => validateField(name, value))
      .filter(el => typeof el === 'boolean');

    if (!isValidArr.every(isValid => isValid === true)) {
      setIsDisabled(true);
      return false;
    }

    if (!validateDataEvent()) {
      setIsDisabled(true);
      return false;
    }

    setIsDisabled(false);

    return true;
  };

  useEffect(() => {
    validate();
  }, [eventData]);

  const onChangeValueModal = event => {
    const { name, value } = event.target;

    validateField(name, value);

    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const onFormatedEvent = event => {
    event.preventDefault();

    const formattedEvent = {
      title: eventData.title,
      dateFrom: getDateTime(eventData.date, eventData.dateFrom),
      dateTo: getDateTime(eventData.date, eventData.dateTo),
      description: eventData.description,
    };

    onSubmitModal(formattedEvent);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <div className="create-event__header-window">
            <span className="create-event__message-error">{messageError}</span>
            <button className="create-event__close-btn" onClick={onHideModal}>
              +
            </button>
          </div>

          <form className="event-form" onSubmit={onFormatedEvent}>
            <input
              type="text"
              name="title"
              placeholder="enter title"
              className={classNames.title}
              onChange={onChangeValueModal}
              value={eventData.title}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className={classNames.date}
                onChange={onChangeValueModal}
                value={eventData.date}
                required
              />
              <input
                type="time"
                name="dateFrom"
                className={classNames.dateFrom}
                onChange={onChangeValueModal}
                value={eventData.dateFrom}
                required
              />
              <input
                type="time"
                name="dateTo"
                className={classNames.dateTo}
                onChange={onChangeValueModal}
                value={eventData.dateTo}
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="enter description"
              className="event-form__field"
              onChange={onChangeValueModal}
              value={eventData.description}
            ></textarea>
            <button disabled={isDisabled} type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  dateInfoForDefault: PropTypes.array.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onSubmitModal: PropTypes.func.isRequired,
};

export default Modal;
