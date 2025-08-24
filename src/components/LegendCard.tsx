import React, { useState, useEffect, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { Icon } from "@iconify/react";
import { Dialog, Transition } from "@headlessui/react";

interface LegendCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegendCard: React.FC<LegendCardProps> = ({ isOpen, onClose }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}legend.md`)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-slate-800 shadow-xl transition-all">
                <div className="relative p-6 max-h-[80vh] flex flex-col">
                  <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors rounded-md p-1"
                  >
                    <Icon icon="mdi:close" className="w-6 h-6" />
                  </button>
                  <div className="markdown-content max-w-none overflow-y-auto flex-1">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LegendCard;
