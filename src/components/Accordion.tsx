import React, { ReactNode } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";

interface AccordionProps {
  title: string;
  icon: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false,
}) => {
  return (
    <Disclosure
      defaultOpen={defaultOpen}
      as="div"
      className="border-b border-slate-700/50 last:border-b-0"
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full flex justify-between items-center py-4 text-left text-sm font-medium text-slate-300 hover:bg-slate-700/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-sm">
            <div className="flex items-center space-x-2">
              <Icon icon={icon} className="w-4 h-4" />
              <span>{title}</span>
            </div>
            <Icon
              icon="mdi:chevron-down"
              className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="py-4">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
