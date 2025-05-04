"use client";

import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { FormProvider } from "./form-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormProps<T extends FieldValues = FieldValues> {
  children: React.ReactNode;
  formSchema: z.ZodObject<any>;
  onSubmit: SubmitHandler<T>;
  initialValues?: Partial<T>;
  submitButtonLabel?: string;
  className?: string;
  submitButtonClassName?: string;
  submitButtonDisabled?: boolean;
  hideSubmitButton?: boolean;
  loading?: boolean;
}

export function Form<T extends FieldValues>({
  children,
  formSchema,
  onSubmit,
  initialValues,
  submitButtonLabel = "Submit",
  className,
  submitButtonClassName,
  submitButtonDisabled = false,
  hideSubmitButton = false,
  loading = false,
}: FormProps<T>) {
  return (
    <FormProvider<T>
      formSchema={formSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <div className={cn("flex flex-col gap-4", className)}>
        {children}

        {!hideSubmitButton && (
          <Button
            type="submit"
            disabled={submitButtonDisabled || loading}
            className={cn("mt-4", submitButtonClassName)}
          >
            {loading ? "Submitting..." : submitButtonLabel}
          </Button>
        )}
      </div>
    </FormProvider>
  );
}

// Export the Form as the default component
export default Form;
