"use server";

import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { TablesInsert } from "@/supabase/supabase-types";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";

export async function setSchoolIdCookie(schoolId: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "school_id",
    value: schoolId,
    path: "/",
    // 30 days expiration
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  });

  return { success: true };
}

// Updated schema for school creation validation matching the database function parameters
const schoolSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  region: z.string().min(2, "Region/State is required"),
  country: z.string().min(2, "Country is required"),
  postal_code: z.string().min(2, "Postal code is required"),
  email: z.string().email("Please enter a valid email address"),
  phone_number: z.string().min(6, "Phone number is required"),
  principal: z.string().optional(), // This is still in the form but not used by the function
});

export async function createSchool(formData: TablesInsert<"school">) {
  try {
    // Validate the input data
    const validatedData = schoolSchema.parse(formData);

    // Get Supabase client
    const supabase = await createClient();

    // Use the new database function to insert school and link it with the current staff user
    const { data, error } = await supabase.rpc(
      "insert_school_and_staff_school",
      {
        school_name: validatedData.name,
        country: validatedData.country,
        city: validatedData.city,
        address: validatedData.address,
        postal_code: validatedData.postal_code,
        region: validatedData.region,
        phone_number: validatedData.phone_number,
        email: validatedData.email,
      },
    );

    if (error) {
      console.error("Error creating school:", error);
      return { error: error.message };
    }

    revalidateTag("schools-for-staff");
    revalidateTag("joints");

    // If successful, set the school ID cookie
    if (data && data.school) {
      await setSchoolIdCookie(data.school);
    }

    return { data };
  } catch (error) {
    console.error("Error in createSchool:", error);
    if (error instanceof z.ZodError) {
      return { error: "Validation error: " + error.errors[0].message };
    }
    return { error: "Failed to create school" };
  }
}

export async function updateSchool(
  schoolId: string,
  formData: TablesInsert<"school">,
) {
  try {
    // Validate the input data
    const validatedData = schoolSchema.partial().parse(formData);

    // Get Supabase client
    const supabase = await createClient();

    // Update the school in the database
    const { data, error } = await supabase
      .from("school")
      .update(validatedData)
      .eq("id", schoolId)
      .select()
      .single();

    if (error) {
      console.error("Error updating school:", error);
      return { error: error.message };
    }

    revalidateTag("schools-for-staff");

    return { data };
  } catch (error) {
    console.error("Error in updateSchool:", error);
    if (error instanceof z.ZodError) {
      return { error: "Validation error: " + error.errors[0].message };
    }
    return { error: "Failed to update school" };
  }
}
