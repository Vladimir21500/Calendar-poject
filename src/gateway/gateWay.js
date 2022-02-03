const baseUrl = 'https://61af86a73e2aba0017c493ea.mockapi.io/api/v1/events';

export const fetchEventInfo = () => {
  return fetch(baseUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Internal Server Error. Can't display events");
      }
      return response.json();
    })
    .then((events) => events);
};

export const createEvent = (eventInfo) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventInfo),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};

export const deleteEvent = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};
