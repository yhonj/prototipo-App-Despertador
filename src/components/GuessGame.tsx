import React, { useState } from 'react';
import { Song, GuessAttempt } from '../types';
import { Music2, User } from 'lucide-react';
import { normalizeString } from '../utils/stringUtils';

interface GuessGameProps {
  song: Song;
  onCorrectGuess: () => void;
  onMaxAttempts: () => void;
}

export function GuessGame({ song, onCorrectGuess, onMaxAttempts }: GuessGameProps) {
  const [songGuess, setSongGuess] = useState('');
  const [artistGuess, setArtistGuess] = useState('');
  const [attempts, setAttempts] = useState<GuessAttempt[]>([]);
  const [currentHint, setCurrentHint] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = 
      normalizeString(songGuess) === normalizeString(song.title) &&
      normalizeString(artistGuess) === normalizeString(song.artist);

    const attempt: GuessAttempt = {
      songGuess,
      artistGuess,
      isCorrect,
    };

    const newAttempts = [...attempts, attempt];
    setAttempts(newAttempts);
    setSongGuess('');
    setArtistGuess('');

    if (isCorrect) {
      onCorrectGuess();
    } else if (newAttempts.length >= 10) {
      onMaxAttempts();
    } else if (currentHint < song.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-center mb-2">Wake Up!</h2>
        <p className="text-sm text-gray-600 text-center">
          Guess the song to stop the alarm
        </p>
      </div>

      <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
        <p className="text-indigo-800 font-medium text-center">
          Hint: {song.hints[currentHint]}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Song Title
          </label>
          <div className="relative">
            <Music2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={songGuess}
              onChange={(e) => setSongGuess(e.target.value)}
              className="pl-10 w-full h-12 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter song title"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={artistGuess}
              onChange={(e) => setArtistGuess(e.target.value)}
              className="pl-10 w-full h-12 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter artist name"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Guess ({10 - attempts.length} attempts remaining)
        </button>
      </form>

      {attempts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Previous Attempts:</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {attempts.map((attempt, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm ${
                  attempt.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <p>Song: {attempt.songGuess}</p>
                <p>Artist: {attempt.artistGuess}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}