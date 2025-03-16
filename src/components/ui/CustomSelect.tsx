import * as React from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "default";
  className?: string;
  id?: string;
  isError: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  size = "default",
  className,
  isError,
  id,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const current = options.find((option) => option.value === value)?.label;

  return (
    <div className="relative">
      <button
        id={id}
        data-slot="select-trigger"
        data-size={size}
        data-testid="select-trigger"
        name="select-trigger"
        className={cn(
          "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive aria-invalid:border-destructive dark:bg-input dark:hover:bg-input flex w-fit items-center justify-between gap-2 rounded-md border bg-input px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <span className="font-bold text-md">
          {current || "Pick your mission"}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="size-4" />
        ) : (
          <ChevronDownIcon className="size-4" />
        )}
      </button>
      {isOpen && !isError && (
        <div
          data-slot="select-content"
          className={cn(
            "bg-popover text-popover-foreground absolute z-50 max-h-60 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md mt-1",
            className
          )}
        >
          {options.map((option) => (
            <div
              role="option"
              key={option.value}
              className={cn(
                "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 py-1.5 pr-6 pl-2 text-sm outline-hidden select-none bg-popover",
                value === option.value && "bg-accent text-accent-foreground"
              )}
              data-testid={`select-item-${option.label}`}
              onClick={() => handleSelect(option)}
            >
              <span className="absolute right-2 flex size-3.5 items-center justify-center">
                {value === option.value && <CheckIcon className="size-4" />}
              </span>
              {option.label}
            </div>
          ))}
        </div>
      )}
      {isError && (
        <div
          className={cn(
            "focus:bg-accent text-red-500 font-bold relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none"
          )}
        >
          Error: Could Not Find Flights
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
