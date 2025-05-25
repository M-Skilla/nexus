// Constants
export const SCHOOL_ID_KEY = "nexus_school_id";

/**
 * Save the current school ID to local storage
 * This is used as a fallback mechanism for client-side redirects
 * since HTTP-only cookies can't be accessed from client-side JavaScript
 */
export const saveSchoolIdToLocalStorage = (schoolId: string) => {
  try {
    localStorage.setItem(SCHOOL_ID_KEY, schoolId);
  } catch (error) {
    console.error("Failed to save school ID to local storage:", error);
  }
};

/**
 * Get the saved school ID from local storage
 */
export const getSchoolIdFromLocalStorage = (): string | null => {
  try {
    return localStorage.getItem(SCHOOL_ID_KEY);
  } catch (error) {
    console.error("Failed to retrieve school ID from local storage:", error);
    return null;
  }
};

/**
 * Clear the saved school ID from local storage
 */
export const clearSchoolIdFromLocalStorage = () => {
  try {
    localStorage.removeItem(SCHOOL_ID_KEY);
  } catch (error) {
    console.error("Failed to clear school ID from local storage:", error);
  }
};
