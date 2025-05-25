"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Form, FormInput, FormSelect } from "@/components/ui/form-builder";
import { toast } from "sonner";
import { TablesInsert } from "@/supabase/supabase-types";
import { createSchool } from "@/app/school/actions";

// Define the schema based on the database function parameters
const schoolFormSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  region: z.string().min(2, "Region/State is required"),
  country: z.string().min(2, "Country is required"),
  postal_code: z.string().min(2, "Postal code is required"),
  email: z.string().email("Please enter a valid email address"),
  phone_number: z.string().min(6, "Phone number is required"),
});

type SchoolFormValues = z.infer<typeof schoolFormSchema>;

type SchoolFormProps = {
  initialData?: Partial<SchoolFormValues>;
  onSuccess?: (data: any) => void;
};

const SchoolForm = ({ initialData, onSuccess }: SchoolFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: SchoolFormValues) => {
    try {
      setIsLoading(true);

      // Call the server action that now uses the insert_school_and_staff_school function
      const result = await createSchool(values);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("School created successfully");
        if (onSuccess) {
          onSuccess(result.data);
        }
      }
    } catch (error) {
      console.error("Failed to create school:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const countryOptions = [
    { value: "Kenya", label: "Kenya" },
    { value: "Uganda", label: "Uganda" },
    { value: "Tanzania", label: "Tanzania" },
    // Add more countries as needed
  ];

  return (
    <Form
      formSchema={schoolFormSchema}
      onSubmit={handleSubmit}
      initialValues={initialData}
      submitButtonLabel="Create School"
      loading={isLoading}
      className="space-y-4"
    >
      <FormInput
        name="name"
        label="School Name"
        placeholder="Enter school name"
        required
      />

      <FormInput
        name="address"
        label="Address"
        placeholder="Enter street address"
        required
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormInput name="city" label="City" placeholder="Enter city" required />

        <FormInput
          name="region"
          label="Region/State"
          placeholder="Enter region or state"
          required
        />

        <FormInput
          name="postal_code"
          label="Postal Code"
          placeholder="Enter postal code"
          required
        />
      </div>

      <FormSelect
        name="country"
        label="Country"
        options={countryOptions}
        placeholder="Select country"
        className="w-full"
        selectClassName="w-full"
        required
      />

      <FormInput
        name="email"
        label="Email Address"
        placeholder="school@example.com"
        type="email"
        required
      />

      <FormInput
        name="phone_number"
        label="Phone Number"
        placeholder="+254 123 456 789"
        required
      />
    </Form>
  );
};

export default SchoolForm;
