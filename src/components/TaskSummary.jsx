import React from 'react';

const TaskSummary = ({ tasks, states }) => {
  const getTaskCount = (stateId) => {
    return (tasks[stateId] || []).length;
  };

  const totalTasks = states.reduce((sum, state) => sum + getTaskCount(state.id), 0);

  const getStateLabel = (stateId) => {
    return states.find(s => s.id === stateId)?.name || '';
  };

  const getStateEmoji = (stateId) => {
    return states.find(s => s.id === stateId)?.emoji || '';
  };

  if (totalTasks === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
      <h3 className="font-semibold text-slate-800 mb-4">Today's Summary</h3>
      
      <div className="mb-4">
        <p className="text-2xl font-light text-slate-800 mb-4">
          <strong>{totalTasks}</strong> tasks logged
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {states.map((state) => {
          const count = getTaskCount(state.id);
          if (count === 0) return null;

          return (
            <div key={state.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-700">
                <span className="text-xl mr-2">{state.emoji}</span>
                {state.name}
              </span>
              <span className="font-semibold text-slate-800">
                {count} {count === 1 ? 'task' : 'tasks'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-600">
          ✓ You matched work to your mental state today
        </p>
      </div>
    </div>
  );
};

export default TaskSummary;

