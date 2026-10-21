export interface UserProfile {
  name: string;
  classLevel: string;
  board: string;
  state: string;
  preferredLanguage: string;
  subjects: string[];
}

const USER_PROFILE_STORAGE_KEY = "studygo.userProfile";

export const saveUserProfile = (profile: UserProfile) => {
  localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const rawProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return null;
  }

  try {
    const parsedProfile = JSON.parse(rawProfile) as Partial<UserProfile>;

    if (
      typeof parsedProfile.name !== "string" ||
      typeof parsedProfile.classLevel !== "string" ||
      typeof parsedProfile.board !== "string" ||
      typeof parsedProfile.state !== "string" ||
      typeof parsedProfile.preferredLanguage !== "string" ||
      !Array.isArray(parsedProfile.subjects)
    ) {
      return null;
    }

    return {
      name: parsedProfile.name,
      classLevel: parsedProfile.classLevel,
      board: parsedProfile.board,
      state: parsedProfile.state,
      preferredLanguage: parsedProfile.preferredLanguage,
      subjects: parsedProfile.subjects,
    };
  } catch {
    return null;
  }
};
