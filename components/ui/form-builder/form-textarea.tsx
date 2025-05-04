"use client";

import React from "react";
import { FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import FormField from "./form-field";
import { useFormContext } from "./form-context";
import { cn } from "@/lib/utils";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  fieldClassName?: string;
  textareaClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  rows?: number;
  disabled?: boolean;
}

export function FormTextarea<T extends FieldValues>({
  name,
  label,
  description,
  required,
  placeholder,
  className,
  fieldClassName,
  textareaClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  rows = 3,
  disabled = false,
}: FormTextareaProps<T>) {
  const { form } = useFormContext<T>();
  const { register } = form;
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
      <Textarea
        id={name.toString()}
        {...register(name)}
        placeholder={placeholder}
        className={cn(error && "border-destructive", textareaClassName)}
        rows={rows}
        disabled={disabled}
      />
    </FormField>
  );
}

export default FormTextarea;
