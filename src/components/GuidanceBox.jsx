import React from 'react';

const GuidanceBox = ({ state }) => {
  const getGuidance = (stateId) => {
    switch (stateId) {
      case 'clear':
        return "This is your deep work window. Protect it. Use it for what matters most.";
      case 'noisy':
        return "Your mind is busy but functional. This is perfect for maintenance work. Don't force deep thinking right now.";
      case 'overwhelmed':
        return "Stop pushing. This state needs regulation first. Move, breathe, switch context. Work can wait.";
      case 'low':
        return "Low energy is not laziness. Do light tasks. Save your brain for when it's actually available.";
      default:
        return "";
    }
  };

  return (
    <div className={`${state.accentColor} rounded-lg p-6 border border-slate-300`}>
      <h3 className="font-semibold text-slate-800 mb-3">💡 Guidance for right now</h3>
      <p className={`text-slate-800 leading-relaxed ${state.textColor}`}>
        {getGuidance(state.id)}
      </p>
    </div>
  );
};

export default GuidanceBox;

