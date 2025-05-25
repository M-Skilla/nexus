"use client";

import React from "react";
import { FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormField from "./form-field";
import { useFormContext } from "./form-context";
import { cn } from "@/lib/utils";

// Define our own InputProps type based on React's native input element props
type InputProps = React.ComponentProps<"input">;

interface FormInputProps<T extends FieldValues>
  extends Omit<InputProps, "name"> {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  inputClassName?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  description,
  required,
  className,
  fieldClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  inputClassName,
  ...props
}: FormInputProps<T>) {
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
      <Input
        id={name.toString()}
        {...register(name)}
        {...props}
        className={cn(error && "border-destructive", inputClassName)}
      />
    </FormField>
  );
}

export default FormInput;
