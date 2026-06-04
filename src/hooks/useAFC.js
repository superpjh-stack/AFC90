import { useState, useEffect, useCallback } from "react";

const STORAGE_KEYS = {
  PROFILE: "afc90_profile",
  CHECKINS: "afc90_checkins",
  SHOWN_MILESTONES: "afc90_shown_milestones",
};

const MILESTONES = [
  {
    day: 3,
    name: "첫 고비 돌파",
    emoji: "🌱",
    message:
      "가장 힘든 72시간을 이겨냈습니다! 알코올이 몸에서 완전히 빠져나갔어요. 당신은 이미 대부분의 사람들이 포기하는 첫 번째 고비를 넘었습니다. 진심으로 축하합니다!",
  },
  {
    day: 7,
    name: "일주일 챔피언",
    emoji: "🏅",
    message:
      "일주일 동안 단 하루도 무너지지 않았습니다. 수면이 좋아지고, 몸이 가벼워진 게 느껴지시나요? 당신은 이미 챔피언입니다. 다음 목표는 21일!",
  },
  {
    day: 21,
    name: "습관의 씨앗",
    emoji: "🌿",
    message:
      "21일! 과학이 증명한 습관 형성의 마법 숫자를 달성했습니다. 금주가 이제 당신의 새로운 일상이 되었어요. 피부는 맑아지고, 에너지는 넘칩니다. 절반까지 달려봅시다!",
  },
  {
    day: 50,
    name: "절반의 영웅",
    emoji: "⚡",
    message:
      "50일! 챌린지의 절반을 넘었습니다. 간이 눈에 띄게 회복되고, 뇌 기능도 최고조를 향해 달려가고 있어요. 이 정도면 영웅이라 불려 마땅합니다. 이제 결승선이 보입니다!",
  },
  {
    day: 90,
    name: "AFC 완주자",
    emoji: "🏆",
    message:
      "90일 완주!! 당신은 해냈습니다! 간이 완전히 회복되고, 심혈관 건강이 크게 개선됐으며, 새로운 당신이 탄생했습니다. AFC 완주자의 자격으로, 앞으로의 모든 도전도 이겨낼 수 있습니다. 정말 자랑스럽습니다!",
  },
];

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
