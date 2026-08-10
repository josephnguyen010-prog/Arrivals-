import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface Profile {
  name: string;
  handle: string;
  bio: string;
  /** A downscaled JPEG data URL, or empty to fall back to initials. */
  avatar: string;
}

const KEY = "arrivals.profile.v1";

const DEFAULT_PROFILE: Profile = {
  name: "Joseph",
  handle: "joseph",
  bio: "",
  avatar: "",
};

function load(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      name: typeof parsed.name === "string" ? parsed.name : DEFAULT_PROFILE.name,
      handle: typeof parsed.handle === "string" ? parsed.handle : DEFAULT_PROFILE.handle,
      bio: typeof parsed.bio === "string" ? parsed.bio : "",
      avatar: typeof parsed.avatar === "string" ? parsed.avatar : "",
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

interface ProfileContextValue {
  profile: Profile;
  save: (next: Profile) => void;
  /** First letters of the name, for when there's no avatar. */
  initials: string;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(profile));
    } catch {
      // An oversized avatar is the only realistic cause; the form guards it.
    }
  }, [profile]);

  const save = useCallback((next: Profile) => {
    setProfile({
      ...next,
      name: next.name.trim() || DEFAULT_PROFILE.name,
      handle: next.handle.trim().replace(/^@+/, "") || DEFAULT_PROFILE.handle,
      bio: next.bio.trim(),
    });
  }, []);

  const value = useMemo<ProfileContextValue>(
    () => ({ profile, save, initials: initialsOf(profile.name) }),
    [profile, save],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function useProfile(): ProfileContextValue {
  const value = useContext(ProfileContext);
  if (!value) throw new Error("useProfile must be used inside a ProfileProvider");
  return value;
}
