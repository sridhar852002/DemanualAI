'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Calendar } from '@/components/calendar/Calendar';
import { EventList } from '@/components/calendar/EventList';
import { EventModal } from '@/components/calendar/EventModal';
import { LogOut, Calendar as CalendarIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function CalendarPage() {
  const { user, logout } = useAuth();
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    setEditingEventId(eventId);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setEditingEventId(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{
        background: 'var(--bg-grouped)'
      }}>
        {/* Header */}
        <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600 rounded-xl shadow-sm">
                    <CalendarIcon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                      Demanual Calendar
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium -mt-1">Your personal schedule manager</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    Welcome back, {user?.email?.split('@')[0]}
                  </div>
                </div>
                <ThemeToggle />
                <button
                  onClick={handleLogout}
                  className="btn-secondary flex items-center space-x-2 text-sm font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Calendar />
            </div>

            {/* Event List */}
            <div className="lg:col-span-1">
              <EventList onEventClick={handleEventClick} />
            </div>
          </div>
        </main>

        {/* Event Modal */}
        {showEventModal && (
          <EventModal
            selectedDate={null}
            editingEventId={editingEventId}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
