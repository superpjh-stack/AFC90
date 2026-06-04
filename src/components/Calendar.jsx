import React, { useMemo } from 'react';

const MILESTONES = [
  { day: 3, name: "첫 고비 돌파", emoji: "🌱", message: "가장 힘든 72시간을 이겨냈습니다! 알코올이 몸에서 완전히 빠져나갔어요. 당신은 이미 대부분의 사람들이 포기하는 첫 번째 고비를 넘었습니다. 진심으로 축하합니다!" },
  { day: 7, name: "일주일 챔피언", emoji: "🏅", message: "일주일 동안 단 하루도 무너지지 않았습니다. 수면이 좋아지고, 몸이 가벼워진 게 느껴지시나요? 당신은 이미 챔피언입니다. 다음 목표는 21일!" },
  { day: 21, name: "습관의 씨앗", emoji: "🌿", message: "21일! 과학이 증명한 습관 형성의 마법 숫자를 달성했습니다. 금주가 이제 당신의 새로운 일상이 되었어요. 피부는 맑아지고, 에너지는 넘칩니다. 절반까지 달려봅시다!" },
  { day: 50, name: "절반의 영웅", emoji: "⚡", message: "50일! 챌린지의 절반을 넘었습니다. 간이 눈에 띄게 회복되고, 뇌 기능도 최고조를 향해 달려가고 있어요. 이 정도면 영웅이라 불려 마땅합니다. 이제 결승선이 보입니다!" },
  { day: 90, name: "AFC 완주자", emoji: "🏆", message: "90일 완주!! 당신은 해냈습니다! 간이 완전히 회복되고, 심혈관 건강이 크게 개선됐으며, 새로운 당신이 탄생했습니다. AFC 완주자의 자격으로, 앞으로의 모든 도전도 이겨낼 수 있습니다. 정말 자랑스럽습니다!" },
];

function MilestoneToast({ milestone, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#1A1035] border border-[#7C3AED]/40 rounded-2xl p-6 max-w-[320px] w-full shadow-[0_0_40px_rgba(124,58,237,0.4)] z-10">
        <div className="text-center mb-4">
          <span className="text-5xl block mb-3">{milestone.emoji}</span>
          <h3 className="text-lg font-bold text-[#F1F0F9] mb-1">{milestone.name}</h3>
          <span className="text-xs text-[#A78BFA]/60 font-medium uppercase tracking-wider">Day {milestone.day} 달성!</span>
        </div>
        <p className="text-sm text-[#F1F0F9]/80 leading-relaxed text-center mb-5">
          {milestone.message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-[0_0_16px_rgba(124,58,237,0.4)] active:scale-95"
        >
          계속 달리기 🚀
        </button>
      </div>
    </div>
  );
}

export default function Calendar({
  startDate,
  checkins = {},
  dayNumber = 1,
  milestones = MILESTONES,
}) {
  const [selectedMilestone, setSelectedMilestone] = React.useState(null);

  const milestoneMap = useMemo(() => {
    const map = {};
    milestones.forEach((m) => { map[m.day] = m; });
    return map;
  }, [milestones]);

  const completedDays = useMemo(() => {
    return Object.values(checkins).filter(Boolean).length;
  }, [checkins]);

  const progressPercent = Math.round((completedDays / 90) * 100);

  const achievedMilestones = useMemo(() => {
    return milestones.filter((m) => dayNumber > m.day || completedDays >= m.day);
  }, [milestones, dayNumber, completedDays]);

  const getDayDateStr = (dayIndex) => {
    if (!startDate) return null;
    const base = new Date(startDate);
    base.setDate(base.getDate() + dayIndex);
    return base.toISOString().split('T')[0];
  };

  const isChecked = (dayIndex) => {
    const dateStr = getDayDateStr(dayIndex);
    if (dateStr && checkins[dateStr]) return true;
    // fallback: treat days before today as checked if dayIndex < dayNumber - 1
    return false;
  };

  const cells = Array.from({ length: 90 }, (_, i) => {
    const day = i + 1;
    const isToday = day === dayNumber;
    const isPast = day < dayNumber;
    const isFuture = day > dayNumber;
    const checked = isChecked(i);
    const milestone = milestoneMap[day];
    return { day, isToday, isPast, isFuture, checked, milestone };
  });

  return (
    <div className="font-['Pretendard',_'Noto_Sans_KR',_sans-serif] min-h-screen bg-[#0F0A1E] text-[#F1F0F9] max-w-[360px] mx-auto relative overflow-x-hidden pb-24">
      {selectedMilestone && (
        <MilestoneToast
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}

      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[#F1F0F9] tracking-tight leading-tight mb-1">
          90일 챌린지 달력
        </h1>
        <p className="text-xs text-[#A78BFA]/60 leading-relaxed">
          Day {dayNumber} · {completedDays}일 완료
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-5">
        <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#A78BFA] tracking-wide uppercase">전체 진행률</span>
            <span className="text-sm font-bold text-[#A78BFA]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#0F0A1E] rounded-full overflow-hidden border border-[#4F46E5]/20">
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-[#A78BFA]/40">시작</span>
            <span className="text-[10px] text-[#A78BFA]/40">90일</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 mb-6">
        <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm">
          <div className="grid grid-cols-10 gap-1">
            {cells.map(({ day, isToday, isPast, isFuture, checked, milestone }) => (
              <button
                key={day}
                onClick={() => milestone && (isPast || isToday) && setSelectedMilestone(milestone)}
                className={[
                  "relative aspect-square flex flex-col items-center justify-center rounded-lg text-[9px] font-semibold transition-all duration-200 select-none",
                  checked
                    ? "bg-[#7C3AED]/30 border border-[#7C3AED]/60 shadow-[0_0_6px_rgba(124,58,237,0.4)]"
                    : isToday
                    ? "bg-[#4F46E5]/20 border-2 border-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                    : isFuture
                    ? "bg-[#0F0A1E]/60 border border-[#4F46E5]/10 opacity-30"
                    : "bg-[#0F0A1E] border border-[#4F46E5]/20",
                  milestone && (isPast || isToday) ? "cursor-pointer" : "cursor-default",
                ].join(" ")}
              >
                {/* Milestone emoji badge */}
                {milestone && (
                  <span
                    className={[
                      "absolute -top-1.5 -right-1.5 text-[10px] leading-none z-10",
                      isFuture ? "opacity-20" : "opacity-100",
                    ].join(" ")}
                    title={milestone.name}
                  >
                    {milestone.emoji}
                  </span>
                )}

                {/* Day number */}
                <span
                  className={[
                    "leading-none",
                    checked
                      ? "text-[#A78BFA]"
                      : isToday
                      ? "text-[#A78BFA] font-bold"
                      : isPast
                      ? "text-[#A78BFA]/50"
                      : "text-[#A78BFA]/20",
                  ].join(" ")}
                >
                  {checked ? "🥤" : day}
                </span>

                {/* Today indicator dot */}
                {isToday && !checked && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#7C3AED]" />
                )}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#4F46E5]/20">
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🥤</span>
              <span className="text-[10px] text-[#A78BFA]/60">완료</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#4F46E5]/20 border-2 border-[#7C3AED]" />
              <span className="text-[10px] text-[#A78BFA]/60">오늘</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#0F0A1E]/60 border border-[#4F46E5]/10 opacity-30" />
              <span className="text-[10px] text-[#A78BFA]/60">미래</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-[#F1F0F9] tracking-tight mb-3">
          마일스톤 배지
        </h2>
        <div className="flex flex-col gap-3">
          {milestones.map((m) => {
            const unlocked = completedDays >= m.day || dayNumber > m.day;
            return (
              <button
                key={m.day}
                onClick={() => unlocked && setSelectedMilestone(m)}
                className={[
                  "bg-[#1A1035] rounded-2xl p-4 shadow-lg border transition-all duration-200 text-left",
                  unlocked
                    ? "border-[#7C3AED]/40 shadow-[0_0_12px_rgba(124,58,237,0.15)] cursor-pointer active:scale-95"
                    : "border-[#4F46E5]/10 opacity-40 cursor-default",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-[#F1F0F9]">{m.name}</span>
                      {unlocked && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-yellow-400/10 text-yellow-300 border border-yellow-400/40 shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                          달성
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#A78BFA]/50">Day {m.day}</span>
                  </div>
                  {unlocked && (
                    <span className="text-[#A78BFA]/40 text-xs">탭하여 보기</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
