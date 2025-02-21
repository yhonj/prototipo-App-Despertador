import React, { useState, useEffect } from 'react';
import { AlarmList } from './components/AlarmList';
import { AlarmForm } from './components/AlarmForm';
import { GuessGame } from './components/GuessGame';
import { Alarm } from './types';
import { songs } from './data/songs';
import { Bell, Plus } from 'lucide-react';
import { getRandomSong } from './utils/stringUtils';

function App() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      const currentDay = now.getDay();

      alarms.forEach((alarm) => {
        if (
          alarm.isActive &&
          alarm.time === currentTime &&
          alarm.days[currentDay] &&
          !activeAlarm
        ) {
          const song = songs.find((s) => s.id === alarm.songId);
          if (song) {
            const newAudio = new Audio(song.url);
            newAudio.loop = true;
            newAudio.play();
            setAudio(newAudio);
            setActiveAlarm(alarm);
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms, activeAlarm]);

  const handleAddAlarm = (time: string, days: boolean[]) => {
    const newAlarm: Alarm = {
      id: Date.now().toString(),
      time,
      songId: getRandomSong(),
      isActive: true,
      days,
    };
    setAlarms([...alarms, newAlarm]);
    setShowForm(false);
  };

  const handleDeleteAlarm = (id: string) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  const handleToggleAlarm = (id: string) => {
    setAlarms(
      alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  };

  const handleCorrectGuess = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    setActiveAlarm(null);
  };

  const handleMaxAttempts = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    setActiveAlarm(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col">
        <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-indigo-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Musical Alarm</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white p-2 rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4">
          {activeAlarm ? (
            <GuessGame
              song={songs.find((s) => s.id === activeAlarm.songId)!}
              onCorrectGuess={handleCorrectGuess}
              onMaxAttempts={handleMaxAttempts}
            />
          ) : showForm ? (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-20">
              <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-xl p-4 transform transition-transform duration-300 ease-in-out">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-4">Add New Alarm</h2>
                <AlarmForm onAddAlarm={handleAddAlarm} onCancel={() => setShowForm(false)} />
              </div>
            </div>
          ) : (
            <AlarmList
              alarms={alarms}
              onDeleteAlarm={handleDeleteAlarm}
              onToggleAlarm={handleToggleAlarm}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;