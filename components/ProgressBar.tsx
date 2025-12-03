import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  compact?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, compact = false }) => {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        {!compact && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {percentage}% Complete
          </span>
        )}
        {!compact && (
           <span className="text-xs text-gray-500 dark:text-gray-400">
            {current}/{total} Lessons
          </span>
        )}
      </div>
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${compact ? 'h-1.5' : 'h-2.5'}`}>
        <div
          className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;