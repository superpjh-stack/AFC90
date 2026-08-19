import { useState, useEffect, useCallback } from "react";
import { MILESTONES } from "../data/challenge";

const STORAGE_KEYS = {
  PROFILE: "afc200_profile",
  CHECKINS: "afc200_checkins",
  SHOWN_MILESTONES: "afc200_shown_milestones",
};

// Keys used before the challenge was extended from 90 to 200 days.
const LEGACY_STORAGE_KEYS = {
  PROFILE: "afc90_profile",
  CHECKINS: "afc90_checkins",
  SHOWN_MILESTONES: "afc90_shown_milestones",
};

// One-time migration: carry existing users' records over to the new keys.
function migrateLegacyStorage() {
  try {
    Object.keys(STORAGE_KEYS).forEach((name) => {
      const nextKey = STORAGE_KEYS[name];
      const legacyKey = LEGACY_STORAGE_KEYS[name];
      if (localStorage.getItem(nextKey) === null) {
        const legacyValue = localStorage.getItem(legacyKey);
        if (legacyValue !== null) {
          localStorage.setItem(nextKey, legacyValue);
        }
      }
    });
  } catch {
    // localStorage unavailable — nothing to migrate.
  }
}

migrateLegacyStorage();

// Average kcal per drink: 130kcal
const KCAL_PER_DRINK = 130;
// KRW per drink
const KRW_PER_DRINK = 4500;
// kcal per kg of body fat
const KCAL_PER_KG = 7700;

function toDateString(date) {
  const d = date instanceof Date ? date : new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // "YYYY-MM-DD" in local time
}

function today() {
  return toDateString(new Date());
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useAFC() {
  const [profile, setProfileState] = useState(() =>
    readJSON(STORAGE_KEYS.PROFILE, null)
  );
  const [checkins, setCheckinsState] = useState(() =>
    readJSON(STORAGE_KEYS.CHECKINS, {})
  );
  const [shownMilestones, setShownMilestonesState] = useState(() =>
    readJSON(STORAGE_KEYS.SHOWN_MILESTONES, [])
  );

  // Sync state → localStorage whenever they change
  useEffect(() => {
    if (profile !== null) {
      writeJSON(STORAGE_KEYS.PROFILE, profile);
    }
  }, [profile]);

  useEffect(() => {
    writeJSON(STORAGE_KEYS.CHECKINS, checkins);
  }, [checkins]);

  useEffect(() => {
    writeJSON(STORAGE_KEYS.SHOWN_MILESTONES, shownMilestones);
  }, [shownMilestones]);

  // ── Profile ──────────────────────────────────────────────────────────────

  const getUserProfile = useCallback(() => {
    return profile;
  }, [profile]);

  const saveUserProfile = useCallback((newProfile) => {
    const normalized = {
      ...newProfile,
      startDate: newProfile.startDate || today(),
    };
    setProfileState(normalized);
    writeJSON(STORAGE_KEYS.PROFILE, normalized);
  }, []);

  // ── Checkins ─────────────────────────────────────────────────────────────

  const getCheckins = useCallback(() => {
    return checkins;
  }, [checkins]);

  const addCheckin = useCallback(
    (dateString) => {
      const key = dateString || today();
      setCheckinsState((prev) => {
        const updated = { ...prev, [key]: true };
        writeJSON(STORAGE_KEYS.CHECKINS, updated);
        return updated;
      });
    },
    []
  );

  // ── Day number ───────────────────────────────────────────────────────────

  const getDayNumber = useCallback(() => {
    if (!profile?.startDate) return 1;
    const start = new Date(profile.startDate);
    start.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diffMs = now - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + 1); // 1-based
  }, [profile]);

  // ── Streak ───────────────────────────────────────────────────────────────

  const getStreak = useCallback(() => {
    let streak = 0;
    const current = new Date();
    current.setHours(0, 0, 0, 0);

    while (true) {
      const key = toDateString(current);
      if (checkins[key]) {
        streak += 1;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }, [checkins]);

  // ── Milestones ────────────────────────────────────────────────────────────

  const getMilestones = useCallback(() => {
    const dayNumber = getDayNumber();
    return MILESTONES.filter((m) => dayNumber >= m.day);
  }, [getDayNumber]);

  const getMilestoneToShow = useCallback(() => {
    const dayNumber = getDayNumber();
    const earned = MILESTONES.filter((m) => dayNumber >= m.day);
    const unshown = earned.find((m) => !shownMilestones.includes(m.day));

    if (unshown) {
      setShownMilestonesState((prev) => {
        const updated = [...prev, unshown.day];
        writeJSON(STORAGE_KEYS.SHOWN_MILESTONES, updated);
        return updated;
      });
      return unshown;
    }

    return null;
  }, [getDayNumber, shownMilestones]);

  // ── Stats ─────────────────────────────────────────────────────────────────

  const getStats = useCallback(() => {
    const dayNumber = getDayNumber();
    const weeklyDrinks = profile?.weeklyDrinks
      ? parseFloat(profile.weeklyDrinks)
      : 0;

    // Total drinks avoided so far (elapsed days * daily average)
    const dailyDrinks = weeklyDrinks / 7;
    const totalDrinksAvoided = dailyDrinks * (dayNumber - 1);

    const savedCalories = Math.round(totalDrinksAvoided * KCAL_PER_DRINK);
    const savedKRW = Math.round(totalDrinksAvoided * KRW_PER_DRINK);
    const estimatedWeightLoss =
      Math.round((savedCalories / KCAL_PER_KG) * 10) / 10; // kg, 1 decimal

    return {
      savedCalories,
      savedKRW,
      estimatedWeightLoss,
    };
  }, [getDayNumber, profile]);

  // ── Public API ────────────────────────────────────────────────────────────

  return {
    getUserProfile,
    saveUserProfile,
    getCheckins,
    addCheckin,
    getDayNumber,
    getStreak,
    getMilestones,
    getMilestoneToShow,
    getStats,
    // Expose raw state for reactive UI
    profile,
    checkins,
  };
}
