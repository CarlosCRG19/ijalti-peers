const createCustomEvent = (name, data, type = 'click') => {
  const event = new CustomEvent(type);

  Object.defineProperty(event, 'target', {
    writable: true,
    value: { value: data, name },
  });

  return event;
};

export default createCustomEvent;
