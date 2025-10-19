
import React from 'react';

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <span className="group relative ml-2">
      <span className="text-gray-400 cursor-help">[?]</span>
      <span 
        className="absolute bottom-full mb-2 w-64 p-2 bg-gray-900 text-gray-200 text-sm rounded-md border border-gray-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 -translate-x-1/2 left-1/2"
      >
        {text}
      </span>
    </span>
  );
};

export default Tooltip;
