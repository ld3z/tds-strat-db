import React from "react";
import { Checkbox, Field, Label } from "@headlessui/react";
import Accordion from "./Accordion";
import { Icon } from "@iconify/react";

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

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  icon,
  options,
  selectedValues,
  onChange,
  defaultOpen,
}) => {
  return (
    <Accordion title={title} icon={icon} defaultOpen={defaultOpen}>
      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
        {options.map((option) => (
          <Field
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <Checkbox
              checked={selectedValues.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="group relative w-4 h-4 bg-slate-700 border border-slate-600 rounded data-[checked]:bg-blue-600 data-[checked]:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
            >
              <Icon
                icon="mdi:check"
                className="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 group-data-[checked]:opacity-100 transition-opacity duration-200"
              />
            </Checkbox>
            {option.icon && (
              <Icon
                icon={option.icon}
                className="w-4 h-4 text-slate-400 group-hover:text-blue-400"
              />
            )}
            <Label
              className={`text-sm capitalize cursor-pointer ${option.color || "text-slate-300 group-hover:text-white"}`}
            >
              {option.label}
            </Label>
          </Field>
        ))}
      </div>
    </Accordion>
  );
};

export default FilterGroup;
