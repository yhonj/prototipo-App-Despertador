import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AlarmFormProps {
  onAddAlarm: (time: string, days: boolean[]) => void;
  onCancel: () => void;
}

export function AlarmForm({ onAddAlarm, onCancel }: AlarmFormProps) {
  const [time, setTime] = useState('07:00');
  const [days, setDays] = useState(Array(7).fill(false));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAlarm(time, days);
    setDays(Array(7).fill(false));
  };

  const toggleDay = (index: number) => {
    const newDays = [...days];
    newDays[index] = !newDays[index];
    setDays(newDays);
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full h-12 px-4 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Repeat</label>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day, index) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(index)}
              className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                days[index]
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {day[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          A random song will be selected when the alarm goes off. Try to guess the song and artist to stop the alarm!
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Alarm
        </button>
      </div>
    </form>
  );
}