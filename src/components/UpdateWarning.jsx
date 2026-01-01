import React from 'react';

const UpdateWarning = () => {
  return (
    <div className="mb-6 p-4 bg-amber-100 border border-amber-300 rounded-lg text-amber-900 flex items-start gap-3">
      <span className="text-lg mt-0.5">⚠️</span>
      <div>
        <p className="font-medium">You've checked in 3 times today</p>
        <p className="text-sm text-amber-800 mt-1">
          Take a moment. States don't need constant monitoring. You're doing fine.
        </p>
      </div>
    </div>
  );
};

export default UpdateWarning;

