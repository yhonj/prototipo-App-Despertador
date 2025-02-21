import React from 'react';
import { Alarm } from '../types';
import { Clock, Trash2 } from 'lucide-react';

interface AlarmListProps {
  alarms: Alarm[];
  onDeleteAlarm: (id: string) => void;
  onToggleAlarm: (id: string) => void;
}

export function AlarmList({ alarms, onDeleteAlarm, onToggleAlarm }: AlarmListProps) {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  if (alarms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] text-gray-500">
        <Clock className="w-16 h-16 mb-4 text-gray-400" />
        <p className="text-lg font-medium">No alarms set</p>
        <p className="text-sm">Tap + to add a new alarm</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alarms.map((alarm) => (
        <div
          key={alarm.id}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-semibold">{alarm.time}</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={alarm.isActive}
                onChange={() => onToggleAlarm(alarm.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {alarm.days.map((isActive, index) => (
                <span
                  key={index}
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                    isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {daysOfWeek[index]}
                </span>
              ))}
            </div>
            <button
              onClick={() => onDeleteAlarm(alarm.id)}
              className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}