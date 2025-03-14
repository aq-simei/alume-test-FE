import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";
import { Label } from "./label";

type CustomInputProps<T extends FieldValues> = React.ComponentProps<"input"> & {
  name: keyof T;
  error?: string;
  label: string;
};

const Input = <T extends FieldValues>({
  className,
  type,
  name,
  label,
  ...props
}: CustomInputProps<T>) => {
  return (
    <div className="flex flex-col w-full space-y-1">
      <div className="flex-row flex w-full justify-center space-x-2">
        <Label className="font-bold text-lg">{label}: </Label>
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      </div>
      {props.error ? (
        <span className="text-red-500 text-sm text-center font-semibold">* {props.error}</span>
      ) : null}
    </div>
  );
};

export { Input };
