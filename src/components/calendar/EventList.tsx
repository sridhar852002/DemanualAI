'use client';

import React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Plus, Sparkles } from 'lucide-react';
import { useEvents } from '@/contexts/EventContext';
import { Event } from '@/types/event';

interface EventListProps {
  onEventClick: (eventId: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ onEventClick }) => {
  const { events } = useEvents();
  
  console.log('EventList - Current events:', events);

  // Sort events by date and time
  const sortedEvents = [...events].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.startTime.localeCompare(b.startTime);
  });

  // Group events by date
  const eventsByDate = sortedEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const formatEventTime = (startTime: string, endTime: string) => {
    const start = parseISO(`2000-01-01T${startTime}`);
    const end = parseISO(`2000-01-01T${endTime}`);
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };

  if (sortedEvents.length === 0) {
    return (
      <div className="card animate-fade-in">
        <div className="card-header">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upcoming Events</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your scheduled events</p>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No events yet</h4>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Start building your schedule by creating your first event</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 dark:text-gray-500">
              <Plus className="w-4 h-4" />
              <span>Click on any date in the calendar to get started</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upcoming Events</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''} scheduled</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="space-y-6">
          {Object.entries(eventsByDate).map(([date, dateEvents]) => (
            <div key={date} className="animate-slide-up">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                </h4>
              </div>
              <div className="space-y-3">
                {dateEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event.id)}
                    className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-all duration-200 hover-lift"
                    style={{ 
                      borderLeftColor: event.color, 
                      borderLeftWidth: '4px',
                      background: `linear-gradient(135deg, ${event.color}05, ${event.color}10)`
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" 
                        style={{ backgroundColor: event.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {event.title}
                        </h5>
                        {event.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span className="font-medium">
                              {formatEventTime(event.startTime, event.endTime)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
