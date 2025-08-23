import React, { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface AccordionProps {
  title: string;
  icon: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-700/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left text-sm font-medium text-slate-300 hover:bg-slate-700/20"
      >
        <div className="flex items-center space-x-2">
          <Icon icon={icon} className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <Icon 
          icon="mdi:chevron-down" 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
