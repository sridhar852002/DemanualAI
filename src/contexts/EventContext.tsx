'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, EventFormData } from '@/types/event';
import { v4 as uuidv4 } from 'uuid';

interface EventContextType {
  events: Event[];
  addEvent: (eventData: EventFormData) => void;
  updateEvent: (id: string, eventData: EventFormData) => void;
  deleteEvent: (id: string) => void;
  getEventsForDate: (date: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: Event & { createdAt: string }) => ({
          ...event,
          createdAt: new Date(event.createdAt),
        }));
        setEvents(parsedEvents);
      } catch (error) {
        console.error('Error loading events from localStorage:', error);
      }
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const addEvent = (eventData: EventFormData) => {
    console.log('addEvent called with:', eventData);
    const newEvent: Event = {
      id: uuidv4(),
      ...eventData,
      createdAt: new Date(),
    };
    console.log('New event created:', newEvent);
    setEvents(prev => {
      const updated = [...prev, newEvent];
      console.log('Updated events array:', updated);
      return updated;
    });
  };

  const updateEvent = (id: string, eventData: EventFormData) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === id
          ? { ...event, ...eventData }
          : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
