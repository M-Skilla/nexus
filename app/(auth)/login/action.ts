"use server";

import { createClient } from "@/supabase/server";
import type { Enums } from "@/supabase/supabase-types";
import { redirect } from "next/navigation";

export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  middleName: string,
  gender: Enums<"gender">,
) {
  let redirectPath: string | null = null;
  try {
    const supabase = await createClient();
    console.log("email:", email);
    console.log("password:", password);
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data?.user) {
      console.error("Signup error:", signUpError);
      return { success: false, error: signUpError };
    }

    const createStaffResult = await createStaffForNewUser(
      data.user.id,
      firstName,
      lastName,
      middleName,
      gender,
    );

    if (createStaffResult?.success && createStaffResult.data) {
      redirectPath = "/auth/verify-email";
      return { success: true, data: createStaffResult.data[0] }; // Return the first staff object
    }

    console.error("Error creating staff object:", createStaffResult?.error);
    return { success: false, error: createStaffResult?.error };
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return { success: false, error };
  } finally {
    if (redirectPath) {
      return redirect(redirectPath);
    }
  }
}

export async function createStaffForNewUser(
  userId: string,
  firstName: string,
  lastName: string,
  middleName: string,
  gender: Enums<"gender">,
) {
  try {
    const supabase = await createClient();

    const { error: insertError, data } = await supabase
      .from("staff")
      .insert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        gender,
        group: 1,
        is_owner: true,
      })
      .select();

    if (insertError) {
      console.error("Error creating staff object:", insertError);
      return { success: false, error: insertError };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error during staff creation:", error);
    return { success: false, error };
  }
}

export async function login(email: string, password: string) {
  let redirectPath: string | null = null;
  try {
    const supabase = await createClient();

    const { error: signInError, data: signInData } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError || !signInData?.user) {
      console.error("Login error:", signInError);
      return { success: false, error: signInError?.message || "Login failed" };
    }

    const { data: staffData, error: staffError } = await supabase
      .from("staff")
      .select("school")
      .eq("id", signInData.user.id)
      .single();

    if (staffError || !staffData) {
      console.error("Error fetching staff data:", staffError);
      return {
        success: false,
        error: staffError?.message || "Failed to retrieve user profile",
      };
    }

    return { success: true, data: staffData.school };
  } catch (error) {
    console.error("Unexpected error during login:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  }
}

export async function logout() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }

    // Redirect to the login page after successful logout
    return { success: true, error: null };
  } catch (error) {
    console.error("Unexpected error during logout:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
