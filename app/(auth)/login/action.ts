"use server";

import { loginSchema } from "@/lib/validation";
import { createClient } from "@/supabase/server";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { RegisterType } from "../register/page";
import { cookies } from "next/headers";
import { SCHOOL_ID_KEY } from "@/lib/school-utils";

export async function login(formData: z.infer<typeof loginSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect("/error");
  }

  // Check for saved school ID in cookies
  const savedSchoolId = (await cookies()).get(SCHOOL_ID_KEY)?.value;

  if (savedSchoolId) {
    // If we have a saved school ID, redirect to that specific school page
    revalidatePath("/", "layout");
    redirect(`/school/${savedSchoolId}`);
    return;
  }

  // If no saved school ID, fetch available schools
  let schoolsData: any[] = [];
  let shouldRedirectToSchool = false;
  let redirectPath = "/school";

  try {
    const { data, error: schoolsError } = await supabase.functions.invoke(
      "retrieve-schools-or-staff",
    );

    if (schoolsError) {
      console.error("Error fetching schools:", schoolsError);
      shouldRedirectToSchool = true;
    } else if (Array.isArray(data) && data.length > 0) {
      schoolsData = data;
      shouldRedirectToSchool = true;

      if (data.length === 1) {
        // If there's only one school, we'll redirect to it
        redirectPath = `/school/${data[0].id}`;
      } else {
        // If there are multiple schools, find the most recent one by created_at
        const sortedSchools = [...data].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        redirectPath = `/school/${sortedSchools[0].id}`;
      }
    }
  } catch (err) {
    console.error("Error handling school redirection:", err);
    shouldRedirectToSchool = true;
  }

  revalidatePath("/", "layout");

  if (shouldRedirectToSchool) {
    redirect(redirectPath);
  }

  redirect("/school");
}

export async function signup(formData: RegisterType) {
  const supabase = await createClient();

  const {
    cPassword,
    email,
    city,
    country,
    password,
    phone,
    postalCode,
    principal,
    principalPhone,
    region,
    schoolName,
    principalEmail,
    streetAddress: address,
    gender,
  } = formData;

  const { error, data } = await supabase.auth.signUp({
    email: principalEmail,
    password,
    options: {
      data: {
        name: principal,
        phone: principalPhone,
      },
    },
  });

  if (error || !data.user) {
    redirect("/error");
  }

  const { error: insertError, data: schoolData } = await supabase
    .from("school")
    .insert({
      region,
      city,
      country,
      email,
      name: schoolName,
      phone_number: phone,
      postal_code: postalCode,
      principal: data.user?.id,
      address,
    })
    .select();

  if (insertError || !schoolData) {
    redirect("/error");
  }

  const image_url = `https://avatar.iran.liara.run/public/${
    gender === "male" ? "boy" : gender === "female" ? "girl" : "boy"
  }?username=${principal.replace(/\s/g, "").toLowerCase()}`;

  const { error: staffError } = await supabase.from("staff").insert({
    name: principal,
    gender: gender || "male",
    group: 1,
    school: schoolData[0].id,
    image_url,
    user_id: data.user.id,
  });

  if (insertError || staffError) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export const getStaff = async () => {
  const supabase = await createClient();

  const getStaffUser = unstable_cache(
    async () => {
      const { data, error } = await supabase.functions.invoke("get-staff-user");

      return { data, error };
    },
    ["staff-user"],
    {
      tags: ["staff-user"],
      revalidate: 24 * 60 * 60,
    },
  );

  const { data, error } = await getStaffUser();

  return { data, error };
};

export const logout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  revalidateTag("staff-user");

  return { error };
};
