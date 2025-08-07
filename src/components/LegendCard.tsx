import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Icon } from '@iconify/react';

interface LegendCardProps {
  onClose: () => void;
}

const LegendCard: React.FC<LegendCardProps> = ({ onClose }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}legend.md`)
      .then(response => response.text())
      .then(text => setMarkdown(text));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-white">
          <Icon icon="mdi:close" className="w-6 h-6" />
        </button>
        <div className="markdown-content max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LegendCard;
