// Constants
export const JOINT_ID_KEY = "nexus_joint_id";

/**
 * Save the current joint ID to local storage
 * This is used as a fallback mechanism for client-side redirects
 * since HTTP-only cookies can't be accessed from client-side JavaScript
 */
export const saveJointIdToLocalStorage = (jointId: string) => {
  try {
    localStorage.setItem(JOINT_ID_KEY, jointId);
  } catch (error) {
    console.error("Failed to save joint ID to local storage:", error);
  }
};

/**
 * Get the saved joint ID from local storage
 */
export const getJointIdFromLocalStorage = (): string | null => {
  try {
    return localStorage.getItem(JOINT_ID_KEY);
  } catch (error) {
    console.error("Failed to retrieve joint ID from local storage:", error);
    return null;
  }
};

/**
 * Clear the saved joint ID from local storage
 */
export const clearJointIdFromLocalStorage = () => {
  try {
    localStorage.removeItem(JOINT_ID_KEY);
  } catch (error) {
    console.error("Failed to clear joint ID from local storage:", error);
  }
};
