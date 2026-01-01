import React from 'react';

const StateCard = ({ state, isActive, onClick }) => {
  const Icon = state.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full ${state.color} border-2 rounded-lg p-6 text-left transition-all hover:shadow-md cursor-pointer ${
        isActive ? 'ring-4 ring-slate-400 shadow-md' : ''
      }`}
      aria-pressed={isActive}
      aria-label={`Select ${state.name}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl" role="img" aria-label={state.name}>
          {state.emoji}
        </span>
        <div className="flex-1">
          <h3 className={`font-semibold ${state.textColor}`}>{state.name}</h3>
          {isActive && (
            <div className="text-xs text-slate-600 mt-1 font-medium">← You are here</div>
          )}
        </div>
      </div>

      <div className={`text-sm ${state.textColor} opacity-80`}>
        <div className="font-medium mb-2 text-xs uppercase tracking-wide">Allowed work:</div>
        <ul className="space-y-1">
          {state.tasks.map((task, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-xs mt-0.5 opacity-60">•</span>
              <span className="text-sm">{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
};

export default StateCard;

