"use client";

import React from "react";
import { FieldValues, Path, Controller } from "react-hook-form";
import { useFormContext } from "./form-context";
import FormField from "./form-field";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  buttonClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  placeholder?: string;
  fromDate?: Date;
  toDate?: Date;
}

export function FormDatePicker<T extends FieldValues>({
  name,
  label,
  description,
  required,
  disabled = false,
  className,
  fieldClassName,
  buttonClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  placeholder = "Pick a date",
  fromDate,
  toDate,
}: FormDatePickerProps<T>) {
  const { form } = useFormContext<T>();
  const error = form.formState.errors[name];

  return (
    <FormField<T>
      name={name}
      label={label}
      description={description}
      required={required}
      className={cn(fieldClassName)}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
      errorClassName={errorClassName}
    >
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={name.toString()}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                  error && "border-destructive",
                  buttonClassName,
                )}
                disabled={disabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value
                  ? format(new Date(field.value), "PPP")
                  : placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={field.onChange}
                disabled={
                  disabled ||
                  ((date) => {
                    if (fromDate && date < fromDate) return true;
                    if (toDate && date > toDate) return true;
                    return false;
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </FormField>
  );
}

export default FormDatePicker;
