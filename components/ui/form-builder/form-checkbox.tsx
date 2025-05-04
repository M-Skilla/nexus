"use client";

import React from "react";
import { FieldValues, Path, Controller } from "react-hook-form";
import { useFormContext } from "./form-context";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  description,
  disabled = false,
  className,
  checkboxClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
}: FormCheckboxProps<T>) {
  const { form } = useFormContext<T>();
  const error = form.formState.errors[name];

  return (
    <div className={cn("flex items-start space-x-2", className)}>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => {
          return (
            <Checkbox
              id={name.toString()}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={cn(checkboxClassName)}
            />
          );
        }}
      />
      <div className="space-y-1 leading-none">
        <Label
          htmlFor={name.toString()}
          className={cn("text-sm font-medium", labelClassName)}
        >
          {label}
        </Label>
        {description && (
          <p
            className={cn(
              "text-muted-foreground text-xs",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
        {error?.message && (
          <p className={cn("text-destructive text-xs", errorClassName)}>
            {error.message as string}
          </p>
        )}
      </div>
    </div>
  );
}

export default FormCheckbox;
