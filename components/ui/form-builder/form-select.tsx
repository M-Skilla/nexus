"use client";

import React from "react";
import { FieldValues, Path, Controller } from "react-hook-form";
import FormField from "./form-field";
import { useFormContext } from "./form-context";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  selectClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  description,
  required,
  options,
  placeholder = "Select an option",
  disabled,
  className,
  fieldClassName,
  selectClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
}: FormSelectProps<T>) {
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
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <SelectTrigger
              id={name.toString()}
              className={cn(error && "border-destructive", selectClassName)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormField>
  );
}

export default FormSelect;
