"use client";

import { saveJointIdToLocalStorage } from "@/lib/joint-utils";
import { useEffect } from "react";

interface SchoolIdClientSaverProps {
  schoolId: string;
}

export default function SchoolIdClientSaver({
  schoolId,
}: SchoolIdClientSaverProps) {
  useEffect(() => {
    if (schoolId) {
      saveJointIdToLocalStorage(schoolId);
    }
  }, [schoolId]);

  // This component doesn't render anything
  return null;
}
