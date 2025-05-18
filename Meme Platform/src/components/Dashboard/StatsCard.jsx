import React from 'react';

const StatsCard = ({ title, value, description, icon, color }) => {
  // Get color classes based on the color prop
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green':
        return 'bg-green-100 text-green-500 dark:bg-green-900/20 dark:text-green-400';
      case 'purple':
        return 'bg-purple-100 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400';
      case 'red':
        return 'bg-red-100 text-red-500 dark:bg-red-900/20 dark:text-red-400';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
          {description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${getColorClasses()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;