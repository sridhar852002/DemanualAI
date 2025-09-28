'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X, Save, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useEvents } from '@/contexts/EventContext';
import { EventFormData } from '@/types/event';

interface EventModalProps {
  selectedDate: Date | null;
  editingEventId: string | null;
  onClose: () => void;
}

const EVENT_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#84CC16', // Lime
];

export const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  editingEventId,
  onClose,
}) => {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
    startTime: '09:00',
    endTime: '10:00',
    color: EVENT_COLORS[0],
  });

  const editingEvent = editingEventId ? events.find(e => e.id === editingEventId) : null;

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description || '',
        date: editingEvent.date,
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime,
        color: editingEvent.color,
      });
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: format(selectedDate, 'yyyy-MM-dd'),
      }));
    }
  }, [editingEvent, selectedDate]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    // Validate form data
    if (!formData.title.trim()) {
      alert('Please enter a title for the event');
      return;
    }

    if (!formData.date) {
      alert('Please select a date for the event');
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      alert('Please enter both start and end times');
      return;
    }

    if (formData.startTime >= formData.endTime) {
      alert('End time must be after start time');
      return;
    }

    if (!formData.color) {
      alert('Please select a color for the event');
      return;
    }

    try {
      if (editingEvent) {
        console.log('Updating event:', editingEvent.id, formData);
        updateEvent(editingEvent.id, formData);
      } else {
        console.log('Adding new event:', formData);
        addEvent(formData);
      }
      console.log('Event operation completed successfully');
      onClose();
    } catch (error) {
      console.error('Error creating/updating event:', error);
      alert('Error creating event. Please try again.');
    }
  };

  const handleDelete = () => {
    if (editingEvent && window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(editingEvent.id);
      onClose();
    }
  };

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div 
      className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md animate-scale-in border border-gray-200 dark:border-gray-700 modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingEvent ? 'Edit Event' : 'Create Event'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {editingEvent ? 'Update your event details' : 'Add a new event to your calendar'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Event Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input-field"
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input-field resize-none"
                placeholder="Add event description (optional)"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Start Time *
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  End Time *
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Event Color
              </label>
              <div className="grid grid-cols-4 gap-3">
                {EVENT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('color', color)}
                    className={`
                      w-14 h-14 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg
                      ${formData.color === color 
                        ? 'border-gray-400 dark:border-gray-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }
                    `}
                    style={{ 
                      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                      boxShadow: formData.color === color ? `0 0 0 2px ${color}20` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            {editingEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="btn-danger flex items-center space-x-2 font-semibold"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            )}
            <div className="flex space-x-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2 font-semibold"
              >
                <Save className="h-4 w-4" />
                <span>{editingEvent ? 'Update Event' : 'Create Event'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
