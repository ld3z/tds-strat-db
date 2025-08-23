import React from 'react';
import Accordion from './Accordion';
import { Icon } from '@iconify/react';

interface FilterOption {
  value: string;
  label: string;
  icon?: string;
  color?: string;
}

interface FilterGroupProps {
  title: string;
  icon: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (value: string) => void;
  defaultOpen?: boolean;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, icon, options, selectedValues, onChange, defaultOpen }) => {
  return (
    <Accordion title={title} icon={icon} defaultOpen={defaultOpen}>
      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-offset-0 focus:ring-offset-slate-800 focus:ring-2"
            />
            {option.icon && <Icon icon={option.icon} className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />}
            <span className={`text-sm capitalize ${option.color || 'text-slate-300 group-hover:text-white'}`}>{option.label}</span>
          </label>
        ))}
      </div>
    </Accordion>
  );
};

export default FilterGroup;
