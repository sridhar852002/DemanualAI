'use client';

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, isToday as isTodayDate } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { EventModal } from './EventModal';
import { useEvents } from '@/contexts/EventContext';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const { getEventsForDate } = useEvents();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventModal(true);
    setEditingEvent(null);
  };

  const handleEventClick = (eventId: string) => {
    setEditingEvent(eventId);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Week day labels
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card animate-fade-in">
      {/* Calendar Header */}
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your schedule</p>
              </div>
            </div>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium text-gray-700 dark:text-gray-200"
            >
              Today
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="px-6 pb-2">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isTodayDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const dayEvents = getEventsForDate(format(day, 'yyyy-MM-dd'));
            const hasEvents = dayEvents.length > 0;
            
            // Debug logging
            if (dayEvents.length > 0) {
              console.log(`Events for ${format(day, 'yyyy-MM-dd')}:`, dayEvents);
            }

            return (
              <div
                key={day.toISOString()}
                className={`
                  calendar-day group relative
                  ${!isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'}
                  ${isToday ? 'today' : ''}
                  ${hasEvents ? 'has-events' : ''}
                  ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}
                `}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`
                    text-sm font-semibold
                    ${isToday ? 'text-white bg-blue-600 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold' : ''}
                    ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {isCurrentMonth && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDate(day);
                        setShowEventModal(true);
                        setEditingEvent(null);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200"
                    >
                      <Plus className="h-3 w-3 text-blue-600" />
                    </button>
                  )}
                </div>
                
                {/* Events for this day */}
                <div className="space-y-1.5">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event.id);
                      }}
                      className="event-card text-xs p-2 rounded-lg truncate cursor-pointer hover:opacity-90 transition-all duration-200 font-medium"
                      style={{ 
                        background: `linear-gradient(135deg, ${event.color}20, ${event.color}30)`,
                        border: `1px solid ${event.color}40`,
                        color: event.color
                      }}
                    >
                      <div className="flex items-center space-x-1.5">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: event.color }}
                        />
                        <span className="truncate font-medium">{event.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          selectedDate={selectedDate}
          editingEventId={editingEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
