"use server";
import { createClient } from "@/supabase/server";
import { Database } from "@/supabase/supabase-types";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

// Cached function to fetch and process staff data (including avatar)
const fetchStaffDataInternal = unstable_cache(
  async (userId: string, supabase: SupabaseClient<Database>) => {
    const { data: staffRecord, error: staffError } = await supabase
      .from("staff")
      .select("*, group(*), subject(*)")
      .eq("id", userId)
      .single();

    // Preserving the original console.log for the fetched staff record
    console.log("Fetched staff record for caching:", staffRecord);

    if (staffError || !staffRecord) {
      console.error("Error fetching staff data in cached function", staffError);
      return {
        staff: null,
        error: staffError ? staffError.message : "Staff not found for user ID.",
      };
    }

    // Construct avatar URL (depends only on staffRecord)
    const staffWithAvatar = {
      ...staffRecord,
      avatar: `https://avatar.iran.liara.run/public/${staffRecord.gender === "MALE" ? "boy" : "girl"}?username=${staffRecord.first_name}${staffRecord.last_name}`,
    };

    return {
      staff: staffWithAvatar,
      error: null,
    };
  },
  [""], // Cache key prefix; userId argument will be part of the full key
  {
    revalidate: 120, // Revalidate every 120 seconds
    tags: ["staff-cache"], // Optional tag for this cache
  },
);

export async function getStaff() {
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();
  if (!user.user || error) {
    console.error("You are not logged in");
    return { staff: null, error: "User not logged in" };
  }
  // Preserving the original console.log for the user object
  console.log(user);

  // Call the cached function to get staff data (includes avatar)
  const cachedResult = await fetchStaffDataInternal(user.user.id, supabase);

  if (cachedResult.error || !cachedResult.staff) {
    // Error logging is handled within fetchStaffDataInternal
    return { staff: null, error: cachedResult.error };
  }

  // Add email to the staff object (email comes from the auth user)
  const finalStaffData = {
    ...cachedResult.staff,
    email: user.user?.email,
  };

  return {
    staff: finalStaffData,
    error: null,
  };
}
