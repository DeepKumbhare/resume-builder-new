import React, { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface SectionTipProps {
  title: string;
  tips: string[];
}

export function SectionTip({ title, tips }: SectionTipProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="mb-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Lightbulb className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
          <h3 className="font-medium text-blue-900 text-sm">{title}</h3>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-blue-400 hover:text-blue-500"
          title="Dismiss tip"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <ul className="mt-1.5 space-y-0.5 text-sm text-blue-800 ml-6">
        {tips.map((tip, index) => (
          <li key={index} className="list-disc">{tip}</li>
        ))}
      </ul>
    </div>
  );
}
