import React from 'react';
import { X } from 'lucide-react';

const StateTaskSection = ({ 
  state, 
  tasks, 
  inputValue, 
  onInputChange, 
  onAddTask, 
  onDeleteTask 
}) => {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAddTask();
    }
  };

  return (
    <div className={`${state.color} border-2 rounded-lg p-6`}>
      <h3 className={`font-semibold ${state.textColor} mb-4 text-lg flex items-center gap-2`}>
        <span className="text-2xl">{state.emoji}</span>
        {state.name}
      </h3>

      {/* Task List */}
      {tasks.length > 0 ? (
        <div className="space-y-2 mb-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start justify-between gap-3 p-3 bg-white/60 rounded border border-slate-200 group`}
            >
              <div className="flex-1">
                <p className={`${state.textColor} text-sm`}>{task.task}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {formatTime(task.timestamp)}
                </p>
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1.5 hover:bg-red-100 rounded transition opacity-0 group-hover:opacity-100"
                aria-label="Delete task"
              >
                <X size={16} className="text-red-600" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={`${state.textColor} text-sm opacity-60 mb-4`}>
          No tasks logged yet
        </p>
      )}

      {/* Add Task Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Log a task in ${state.name}...`}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
        />
        <button
          onClick={onAddTask}
          className={`px-4 py-2 ${state.accentColor} text-slate-800 rounded-lg hover:opacity-80 transition font-medium text-sm`}
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default StateTaskSection;

