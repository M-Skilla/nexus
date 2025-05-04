"use client";

import { saveSchoolIdToLocalStorage } from "@/lib/school-utils";
import { useEffect } from "react";
import { setSchoolIdCookie } from "@/app/school/actions";

interface SchoolIdClientSaverProps {
  schoolId: string;
}

export default function SchoolIdClientSaver({
  schoolId,
}: SchoolIdClientSaverProps) {
  useEffect(() => {
    if (schoolId) {
      // Save to localStorage
      saveSchoolIdToLocalStorage(schoolId);

      // Also set the cookie using the server action
      setSchoolIdCookie(schoolId);
    }
  }, [schoolId]);

  // This component doesn't render anything
  return null;
}
