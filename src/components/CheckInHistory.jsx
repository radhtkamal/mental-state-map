import React from 'react';

const CheckInHistory = ({ lastUpdated, updateCount, history }) => {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const getStateEmoji = (stateId) => {
    const map = {
      clear: '🌤',
      noisy: '🌊',
      overwhelmed: '🌧',
      low: '🌙'
    };
    return map[stateId] || '';
  };

  if (lastUpdated) {
    return (
      <div className="mb-8">
        <div className="mb-4 text-sm text-slate-600">
          <span className="font-medium">Last check-in:</span> {formatTime(lastUpdated)} • 
          <span className="ml-2"><strong>{updateCount}</strong>/3 updates today</span>
        </div>

        {history && history.length > 1 && (
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="text-xs font-semibold uppercase text-slate-600 mb-3">Today's states</h4>
            <div className="flex gap-2 flex-wrap">
              {history.slice(0, 5).map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-full border border-slate-200 text-sm"
                >
                  <span className="text-lg">{getStateEmoji(entry.state)}</span>
                  <span className="text-xs text-slate-600">
                    {formatTime(entry.time)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default CheckInHistory;

