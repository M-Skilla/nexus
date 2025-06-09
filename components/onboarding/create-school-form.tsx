"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  MapPinned,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/supabase/client";
import { CountrySelector } from "../country-selector";
import { toast } from "sonner";
import { getStaff } from "@/lib/get-staff";

// Define the form schema with validation
const schoolFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "School name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone_number: z
    .string()
    .min(5, { message: "Please enter a valid phone number" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  region: z
    .string()
    .min(2, { message: "Region/State must be at least 2 characters" }),
  postal_code: z
    .string()
    .min(2, { message: "Postal code must be at least 2 characters" }),
  country: z.string().min(2, { message: "Please select a country" }),
});

type SchoolFormValues = z.infer<typeof schoolFormSchema>;

export default function CreateSchoolForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with default values
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: SchoolFormValues) => {
    setIsSubmitting(true);

    const { staff, error } = await getStaff();

    if (error || !staff) {
      console.error("Error fetching staff data:", error);
      toast.error("Failed to fetch staff data. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create Supabase client
      const supabase = createClient();
      const {
        address,
        city,
        country,
        email,
        name,
        phone_number,
        postal_code,
        region,
      } = data;

      const { error } = await supabase.rpc("create_school_and_assign_staff", {
        p_address: address,
        p_city: city,
        p_country: country,
        p_email: email,
        p_name: name,
        p_phone_number: phone_number,
        p_postal_code: postal_code,
        p_region: region,
        p_staff_id: staff.id,
      });

      if (error) {
        throw error;
      }

      // Navigate to the next step in onboarding
      router.push("/onboarding/success");
    } catch (error: any) {
      console.error("Error creating school:", error);
      toast.error(error);
      // Handle error (you could set an error state and display it)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* School Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building2 className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                    <Input
                      placeholder="Enter school name"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                    <Input
                      placeholder="school@example.com"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                    <Input
                      placeholder="+1 (555) 000-0000"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                    <Input
                      placeholder="123 Education St."
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                    <Input placeholder="City" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Region/State */}
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region/State</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPinned className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                    <Input
                      placeholder="Region or State"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                    <Input
                      placeholder="Postal Code"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <div className="relative">
                    <CountrySelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
