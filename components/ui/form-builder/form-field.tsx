"use client";

import React from "react";
import { useFormContext } from "./form-context";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  description,
  required,
  children,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
}: FormFieldProps<T>) {
  const { form } = useFormContext<T>();
  const error = form.formState.errors[name];

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between">
          <Label
            htmlFor={name.toString()}
            className={cn(
              "text-sm font-medium",
              error ? "text-destructive" : "",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        </div>
      )}

      {children}

      {description && !error && (
        <p
          className={cn("text-muted-foreground text-xs", descriptionClassName)}
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
  );
}

export default FormField;
