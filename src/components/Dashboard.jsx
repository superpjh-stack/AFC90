import { useState, useEffect } from "react";

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

function getNextMilestone(dayNumber) {
  return MILESTONES.find((m) => m.day > dayNumber) || MILESTONES[MILESTONES.length - 1];
}

function getUnlockedMilestones(dayNumber) {
  return MILESTONES.filter((m) => m.day <= dayNumber);
}

export default function Dashboard({
  profile,
  dayNumber,
  streak,
  todayChecked,
  onCheckin,
  stats,
  currentBodyChange,
  onSOS,
}) {
  const [stamping, setStamping] = useState(false);
  const [showStampEffect, setShowStampEffect] = useState(false);

  const name = profile?.name || "용사";
  const nextMilestone = getNextMilestone(dayNumber);
  const unlockedMilestones = getUnlockedMilestones(dayNumber);
  const progressToNext =
    nextMilestone.day === dayNumber
      ? 100
      : Math.min(100, Math.round((dayNumber / nextMilestone.day) * 100));

  const handleCheckin = () => {
    if (todayChecked || stamping) return;
    setStamping(true);
    setShowStampEffect(true);
    setTimeout(() => {
      setStamping(false);
      setShowStampEffect(false);
      if (onCheckin) onCheckin();
    }, 900);
  };

  return (
    <div className="font-['Pretendard','Noto_Sans_KR',sans-serif] min-h-screen bg-[#0F0A1E] text-[#F1F0F9] max-w-[360px] mx-auto relative overflow-x-hidden pb-28">
      {/* Stamp animation keyframes injected via style tag */}
      <style>{`
        @keyframes stamp-bounce {
          0%   { transform: scale(1.5) rotate(-10deg); opacity: 0; }
          40%  { transform: scale(0.85) rotate(3deg);  opacity: 1; }
          65%  { transform: scale(1.1) rotate(-2deg);  opacity: 1; }
          100% { transform: scale(1) rotate(0deg);     opacity: 1; }
        }
        @keyframes sos-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(220,38,38,0.3), 0 0 24px rgba(220,38,38,0.5); }
          50%       { box-shadow: 0 0 0 10px rgba(220,38,38,0.1), 0 0 36px rgba(220,38,38,0.7); }
        }
        @keyframes stamp-ripple {
          0%   { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .stamp-animate { animation: stamp-bounce 0.9s cubic-bezier(.36,.07,.19,.97) both; }
        .stamp-ripple  { animation: stamp-ripple 0.7s ease-out both; }
        .sos-btn       { animation: sos-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* ─── Header ──────────────────────────────────────────────── */}
      <div className="px-4 pt-10 pb-4">
        <p className="text-xs text-[#A78BFA]/60 tracking-wide uppercase mb-0.5">AFC 90일 챌린지</p>
        <h1 className="text-2xl font-bold text-[#F1F0F9] tracking-tight leading-tight">
          안녕하세요, {name}님 💪
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-4xl font-black text-[#7C3AED] leading-none">{dayNumber}</span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#F1F0F9]">일차</span>
            <span className="text-[10px] text-[#A78BFA]/60">금주 {dayNumber}일차</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-[#1A1035] border border-[#4F46E5]/30 rounded-full px-3 py-1">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-bold text-[#F1F0F9]">{streak}일</span>
            <span className="text-[10px] text-[#A78BFA]/60">연속</span>
          </div>
        </div>
      </div>

      {/* ─── Progress to next milestone ──────────────────────────── */}
      <div className="px-4 mb-4">
        <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#A78BFA] uppercase tracking-wide">
              다음 마일스톤
            </span>
            <span className="text-xs text-[#A78BFA]/60">
              {nextMilestone.emoji} {nextMilestone.name}
            </span>
          </div>
          <div className="w-full h-2 bg-[#0F0A1E] rounded-full overflow-hidden border border-[#4F46E5]/20 mb-1">
            <div
              className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full transition-all duration-700"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#A78BFA]/50">
            <span>{dayNumber}일</span>
            <span>{nextMilestone.day}일 목표</span>
          </div>
        </div>
      </div>

      {/* ─── Check-in Button ─────────────────────────────────────── */}
      <div className="px-4 mb-5">
        <div className="relative">
          {/* Stamp ripple effect overlay */}
          {showStampEffect && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-24 h-24 rounded-full border-4 border-[#7C3AED] stamp-ripple" />
            </div>
          )}

          <button
            onClick={handleCheckin}
            disabled={todayChecked || stamping}
            className={[
              "w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-200 text-base relative overflow-hidden",
              todayChecked
                ? "bg-[#1A1035] text-[#A78BFA] border border-[#7C3AED]/50 cursor-default shadow-none"
                : stamping
                ? "bg-[#6D28D9] text-white scale-95 shadow-[0_0_28px_rgba(124,58,237,0.7)]"
                : "bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] active:scale-95 text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]",
            ].join(" ")}
          >
            {/* Stamp overlay */}
            {stamping && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl stamp-animate">✅</span>
              </span>
            )}
            <span className={stamping ? "opacity-0" : "opacity-100"}>
              {todayChecked ? "오늘도 해냈어요! ✅" : "오늘 도장 찍기"}
            </span>
          </button>
        </div>

        {todayChecked && (
          <p className="text-center text-[10px] text-[#A78BFA]/50 mt-2">
            오늘 체크인 완료 · 내일 또 만나요!
          </p>
        )}
      </div>

      {/* ─── Stats Cards ─────────────────────────────────────────── */}
      <div className="px-4 mb-5">
        <p className="text-xs font-medium text-[#A78BFA] uppercase tracking-wide mb-2">
          누적 절약 통계
        </p>
        <div className="grid grid-cols-3 gap-2">
          {/* Calories */}
          <div className="bg-[#1A1035] rounded-2xl p-3 border border-[#7C3AED]/20 shadow-lg flex flex-col items-center gap-1">
            <span className="text-xl">🔥</span>
            <span className="text-lg font-black text-[#F1F0F9] leading-none">
              {stats?.calories != null
                ? stats.calories >= 1000
                  ? `${(stats.calories / 1000).toFixed(1)}k`
                  : stats.calories
                : "—"}
            </span>
            <span className="text-[9px] text-[#A78BFA]/60 text-center leading-tight">
              칼로리
              <br />절약
            </span>
          </div>

          {/* Money */}
          <div className="bg-[#1A1035] rounded-2xl p-3 border border-[#7C3AED]/20 shadow-lg flex flex-col items-center gap-1">
            <span className="text-xl">💰</span>
            <span className="text-lg font-black text-[#F1F0F9] leading-none">
              {stats?.money != null
                ? stats.money >= 10000
                  ? `${Math.floor(stats.money / 10000)}만`
                  : `${stats.money.toLocaleString()}`
                : "—"}
            </span>
            <span className="text-[9px] text-[#A78BFA]/60 text-center leading-tight">
              원
              <br />절약
            </span>
          </div>

          {/* Weight */}
          <div className="bg-[#1A1035] rounded-2xl p-3 border border-[#7C3AED]/20 shadow-lg flex flex-col items-center gap-1">
            <span className="text-xl">⚖️</span>
            <span className="text-lg font-black text-[#F1F0F9] leading-none">
              {stats?.weight != null ? `${stats.weight > 0 ? "-" : ""}${Math.abs(stats.weight)}` : "—"}
            </span>
            <span className="text-[9px] text-[#A78BFA]/60 text-center leading-tight">
              kg
              <br />예상
            </span>
          </div>
        </div>
      </div>

      {/* ─── Body Change Preview ─────────────────────────────────── */}
      {currentBodyChange && (
        <div className="px-4 mb-5">
          <p className="text-xs font-medium text-[#A78BFA] uppercase tracking-wide mb-2">
            오늘의 신체 변화
          </p>
          <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20">
            <div className="flex items-start gap-3">
              <span className="text-3xl mt-0.5 flex-shrink-0">
                {currentBodyChange.emoji || "🫀"}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#F1F0F9] mb-1 leading-tight">
                  {currentBodyChange.title || "몸이 회복 중이에요"}
                </h3>
                <p className="text-xs text-[#A78BFA]/70 leading-relaxed">
                  {currentBodyChange.message || "매일 조금씩 더 건강해지고 있습니다."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Milestone Badges ────────────────────────────────────── */}
      <div className="px-4 mb-5">
        <p className="text-xs font-medium text-[#A78BFA] uppercase tracking-wide mb-2">
          마일스톤
        </p>
        <div className="flex flex-wrap gap-2">
          {MILESTONES.map((m) => {
            const unlocked = dayNumber >= m.day;
            return (
              <span
                key={m.day}
                data-unlocked={unlocked ? "true" : undefined}
                data-locked={!unlocked ? "true" : undefined}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/30 data-[locked=true]:opacity-40 data-[locked=true]:grayscale data-[unlocked=true]:shadow-[0_0_10px_rgba(234,179,8,0.5)] data-[unlocked=true]:border-yellow-400/60 data-[unlocked=true]:text-yellow-300 data-[unlocked=true]:bg-yellow-400/10 transition-all"
              >
                <span>{m.emoji}</span>
                <span>{m.name}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ─── Streak streak summary ───────────────────────────────── */}
      <div className="px-4 mb-6">
        <div className="bg-[#1A1035] rounded-2xl p-4 border border-[#4F46E5]/30 shadow-lg flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#7C3AED]/20 flex items-center justify-center">
            <span className="text-3xl">🔥</span>
          </div>
          <div>
            <p className="text-lg font-black text-[#F1F0F9]">
              {streak}일 연속 달성 중
            </p>
            <p className="text-xs text-[#A78BFA]/60 mt-0.5">포기하지 마세요! 계속 달려갑시다</p>
          </div>
        </div>
      </div>

      {/* ─── SOS Button (fixed) ──────────────────────────────────── */}
      <button
        className="sos-btn fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-red-600 text-white font-black text-sm flex items-center justify-center active:scale-90 transition-transform duration-150 select-none"
        aria-label="SOS 긴급 도움 요청"
        onClick={() => onSOS && onSOS()}
      >
        SOS
      </button>
    </div>
  );
}
