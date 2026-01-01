import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import StateCard from './StateCard';
import CheckInHistory from './CheckInHistory';
import GuidanceBox from './GuidanceBox';
import UpdateWarning from './UpdateWarning';

const MentalStateBoard = () => {
  const [currentState, setCurrentState] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [history, setHistory] = useState([]);

  const states = [
    {
      id: 'clear',
      emoji: '🌤',
      name: 'Clear / Focused',
      icon: Sun,
      color: 'bg-amber-50 border-amber-200',
      textColor: 'text-amber-900',
      accentColor: 'bg-amber-100',
      tasks: [
        'Deep thinking',
        'Writing',
        'Complex problem-solving',
        'Planning'
      ]
    },
    {
      id: 'noisy',
      emoji: '🌊',
      name: 'Noisy but Functional',
      icon: Cloud,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-900',
      accentColor: 'bg-blue-100',
      tasks: [
        'Mechanical tasks',
        'Refactoring',
        'Formatting',
        'Reviewing',
        'Cleaning up'
      ]
    },
    {
      id: 'overwhelmed',
      emoji: '🌧',
      name: 'Overwhelmed',
      icon: CloudRain,
      color: 'bg-slate-50 border-slate-300',
      textColor: 'text-slate-900',
      accentColor: 'bg-slate-200',
      tasks: [
        'Stop deep work',
        'Do admin tasks',
        'Move your body',
        'Switch environment'
      ]
    },
    {
      id: 'low',
      emoji: '🌙',
      name: 'Low Energy',
      icon: Moon,
      color: 'bg-indigo-50 border-indigo-200',
      textColor: 'text-indigo-900',
      accentColor: 'bg-indigo-100',
      tasks: [
        'Light admin',
        'Organizing files',
        'Easy communication',
        'Simple maintenance'
      ]
    }
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('mentalStateData');
    if (stored) {
      const data = JSON.parse(stored);
      setCurrentState(data.currentState);
      setLastUpdated(data.lastUpdated);
      setHistory(data.history || []);
      
      const today = new Date().toDateString();
      const lastDate = new Date(data.lastUpdated).toDateString();
      setUpdateCount(today === lastDate ? data.updateCount : 0);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (currentState || lastUpdated) {
      localStorage.setItem('mentalStateData', JSON.stringify({
        currentState,
        lastUpdated,
        updateCount,
        history
      }));
    }
  }, [currentState, lastUpdated, updateCount, history]);

  const handleStateChange = (stateId) => {
    const now = new Date();
    const today = now.toDateString();
    const lastDate = lastUpdated ? new Date(lastUpdated).toDateString() : null;
    
    let newCount = today === lastDate ? updateCount + 1 : 1;
    
    if (newCount > 3) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    setCurrentState(stateId);
    setLastUpdated(now.toISOString());
    setUpdateCount(newCount);

    // Add to history
    const newEntry = {
      state: stateId,
      time: now.toISOString(),
      date: today
    };
    setHistory([newEntry, ...history].slice(0, 20)); // Keep last 20 entries
  };

  const getStateData = (id) => states.find(s => s.id === id);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div></div>
          <Link 
            to="/tasks" 
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition text-sm font-medium"
          >
            📝 View Tasks
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-2">
            Mental State Weather Map
          </h1>
          <p className="text-slate-600 text-lg">
            This is state-awareness, not performance monitoring.
          </p>
          <p className="text-sm text-slate-500 mt-1">
            You don't blame rain for being rain.
          </p>
        </div>

        {/* Warning */}
        {showWarning && <UpdateWarning />}

        {/* Check-in Info */}
        {lastUpdated && (
          <CheckInHistory lastUpdated={lastUpdated} updateCount={updateCount} />
        )}

        {/* State Cards - Single Column */}
        <div className="space-y-4 mb-8">
          {states.map((state) => (
            <StateCard
              key={state.id}
              state={state}
              isActive={currentState === state.id}
              onClick={() => handleStateChange(state.id)}
            />
          ))}
        </div>

        {/* Safety Guidelines */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="font-semibold text-slate-800 mb-4">How to use this safely</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">•</span>
              <span>Check in 2-3 times per day maximum (enforced above)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">•</span>
              <span>You are not trying to move to a "better" column</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">•</span>
              <span>You are just checking where you are</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">•</span>
              <span>States are conditions, not failures</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-slate-400 mt-0.5">•</span>
              <span>Match your current work to your current state</span>
            </p>
          </div>
        </div>

        {/* Guidance */}
        {currentState && <GuidanceBox state={getStateData(currentState)} />}

        {/* History */}
        {history.length > 0 && <CheckInHistory history={history} />}
      </div>
    </div>
  );
};

export default MentalStateBoard;

