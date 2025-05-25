"use client";
import React, { createContext, useContext } from "react";
import {
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Form context with strongly typed generics
interface FormContextProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  formSchema: z.ZodSchema<any>;
}

const FormContext = createContext<FormContextProps<any> | null>(null);

// Hook to use the form context
export function useFormContext<T extends FieldValues>() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context as FormContextProps<T>;
}

// Props for the FormProvider component
interface FormProviderProps<T extends FieldValues> {
  children: React.ReactNode;
  formSchema: z.ZodSchema<any>;
  onSubmit: SubmitHandler<T>;
  initialValues?: Partial<T>;
  formOptions?: Omit<UseFormProps<T>, "resolver">;
}

// FormProvider component that provides the form context
export function FormProvider<T extends FieldValues>({
  children,
  formSchema,
  onSubmit,
  initialValues,
  formOptions,
}: FormProviderProps<T>) {
  // Create the form with the correct types
  const form = useForm<T>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: initialValues as any,
    ...formOptions,
  });

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error("Form submission failed");
      console.error(error);
    }
  };

  return (
    <FormContext.Provider value={{ form, formSchema }}>
      <form
        onSubmit={form.handleSubmit(handleSubmit as any)}
        className="space-y-6"
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
