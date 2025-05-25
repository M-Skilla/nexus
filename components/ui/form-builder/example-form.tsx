"use client";

import React from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  FormDatePicker,
} from "./index";

// Define your form schema with Zod
const exampleFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  startDate: z.date().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

// Define the type based on the schema
type ExampleFormValues = z.infer<typeof exampleFormSchema>;

interface ExampleFormProps {
  onSuccess?: (data: ExampleFormValues) => void;
  initialValues?: Partial<ExampleFormValues>;
}

export default function ExampleForm({
  onSuccess,
  initialValues,
}: ExampleFormProps) {
  const handleSubmit = async (data: ExampleFormValues) => {
    try {
      // Here you would typically make an API call
      console.log("Form submitted with:", data);

      // Show success message
      toast.success("Form submitted successfully!");

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      toast.error("Failed to submit form");
      console.error(error);
    }
  };

  // Category options for select dropdown
  const categoryOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing Question" },
    { value: "feedback", label: "Feedback" },
  ];

  return (
    <Form<ExampleFormValues>
      formSchema={exampleFormSchema}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      submitButtonLabel="Submit Form"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput<ExampleFormValues>
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormInput<ExampleFormValues>
          name="email"
          label="Email Address"
          placeholder="your.email@example.com"
          type="email"
          required
        />
      </div>

      <FormSelect<ExampleFormValues>
        name="category"
        label="Category"
        options={categoryOptions}
        placeholder="Select a category"
        required
      />

      <FormTextarea<ExampleFormValues>
        name="message"
        label="Message"
        placeholder="Enter your message here"
        required
        rows={4}
      />

      <FormDatePicker<ExampleFormValues>
        name="startDate"
        label="Start Date (Optional)"
        description="When would you like to start?"
      />

      <FormCheckbox<ExampleFormValues>
        name="agreeToTerms"
        label="I agree to the terms and conditions"
        description="You must agree to continue"
      />
    </Form>
  );
}
