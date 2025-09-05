import { useState } from 'react';
import { DEFAULT_EVENT } from '../utils/constants';

export const useEventSequence = () => {
  const [eventSequence, setEventSequence] = useState([
    { id: 1, ...DEFAULT_EVENT }
  ]);

  const addEvent = () => {
    const newId = Math.max(...eventSequence.map(e => e.id)) + 1;
    setEventSequence([...eventSequence, { id: newId, ...DEFAULT_EVENT }]);
  };

  const removeEvent = (id) => {
    if (eventSequence.length > 1) {
      setEventSequence(eventSequence.filter(e => e.id !== id));
    }
  };

  const updateEvent = (id, field, value) => {
    setEventSequence(eventSequence.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  return {
    eventSequence,
    addEvent,
    removeEvent,
    updateEvent
  };
};