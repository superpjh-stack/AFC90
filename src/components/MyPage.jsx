import { useState } from 'react';
import { MILESTONES } from '../data/challenge';

export default function MyPage({ profile, stats, dayNumber, milestones = [], onReset }) {
  const [showResetDialog, setShowResetDialog] = useState(false);

  const achievedDays = milestones.map((m) => m.day);

  // Use stats from useAFC (130kcal/잔, 4500원/잔 기준)
  const caloriesSaved = stats?.savedCalories ?? 0
  const moneySaved = stats?.savedKRW ?? 0
  const weightLoss = (stats?.estimatedWeightLoss ?? 0).toFixed(1)

  const startDateStr = profile?.startDate
    ? new Date(profile.startDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  const handleResetConfirm = () => {
    setShowResetDialog(false);
    if (onReset) onReset();
  };

  return (
    <div className="font-['Pretendard',_'Noto_Sans_KR',_sans-serif] min-h-screen bg-[#0F0A1E] text-[#F1F0F9] max-w-[360px] mx-auto relative overflow-x-hidden pb-28 px-4 pt-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#F1F0F9] tracking-tight leading-tight mb-6">마이페이지</h1>

      {/* Profile Section */}
      <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#7C3AED]/30 border-2 border-[#A78BFA]/60 flex items-center justify-center text-2xl select-none">
            🧑
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-[#F1F0F9] tracking-tight truncate">
              {profile?.name || '익명 챌린저'}
            </p>
            <p className="text-xs text-[#A78BFA]/60 leading-relaxed">금주 시작일: {startDateStr}</p>
            <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30">
              <span className="text-[10px] font-semibold text-[#A78BFA]">Day {dayNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <h2 className="text-lg font-semibold text-[#F1F0F9] tracking-tight mb-3">예측 통계</h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-[#1A1035] rounded-2xl p-3 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm flex flex-col items-center gap-1">
          <span className="text-xl">🔥</span>
          <p className="text-base font-bold text-[#A78BFA]">{caloriesSaved.toLocaleString()}</p>
          <p className="text-[10px] text-[#A78BFA]/60 text-center leading-tight">절약<br />칼로리</p>
        </div>
        <div className="bg-[#1A1035] rounded-2xl p-3 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm flex flex-col items-center gap-1">
          <span className="text-xl">💰</span>
          <p className="text-base font-bold text-[#A78BFA]">₩{moneySaved.toLocaleString()}</p>
          <p className="text-[10px] text-[#A78BFA]/60 text-center leading-tight">절약<br />금액</p>
        </div>
        <div className="bg-[#1A1035] rounded-2xl p-3 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm flex flex-col items-center gap-1">
          <span className="text-xl">⚖️</span>
          <p className="text-base font-bold text-[#A78BFA]">{weightLoss}kg</p>
          <p className="text-[10px] text-[#A78BFA]/60 text-center leading-tight">예상 체중<br />감량</p>
        </div>
      </div>

      {/* Badge Collection */}
      <h2 className="text-lg font-semibold text-[#F1F0F9] tracking-tight mb-3">배지 컬렉션</h2>
      <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm mb-6">
        <div className="grid grid-cols-3 gap-3">
          {MILESTONES.map((milestone) => {
            const achieved = achievedDays.includes(milestone.day);
            return (
              <div
                key={milestone.day}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 ${
                  achieved
                    ? 'bg-[#7C3AED]/15 border border-[#7C3AED]/40 shadow-[0_0_12px_rgba(124,58,237,0.25)]'
                    : 'opacity-30 grayscale'
                }`}
              >
                <span className="text-2xl">{milestone.emoji}</span>
                <p className="text-[10px] font-semibold text-[#A78BFA] text-center leading-tight">
                  {milestone.name}
                </p>
                <span className="text-[9px] text-[#A78BFA]/60">Day {milestone.day}</span>
                {achieved && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-yellow-400/10 text-yellow-300 border border-yellow-400/60 shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                    달성
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {achievedDays.length === 0 && (
          <p className="text-center text-xs text-[#A78BFA]/40 mt-2">
            첫 번째 배지를 향해 달려가세요!
          </p>
        )}
      </div>

      {/* Reset Section */}
      <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-red-700/30 backdrop-blur-sm mb-4">
        <p className="text-sm font-semibold text-[#F1F0F9] mb-1">금주 리셋</p>
        <p className="text-xs text-[#A78BFA]/60 leading-relaxed mb-4">
          기록이 초기화되며 Day 1부터 다시 시작합니다. 이 작업은 되돌릴 수 없습니다.
        </p>
        <button
          onClick={() => setShowResetDialog(true)}
          className="w-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-[0_0_16px_rgba(185,28,28,0.4)] active:scale-95"
        >
          금주 리셋
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <div className="bg-[#1A1035] rounded-2xl p-6 shadow-2xl border border-red-700/40 w-full max-w-[320px]">
            <p className="text-lg font-semibold text-[#F1F0F9] mb-2 text-center">정말 리셋할까요?</p>
            <p className="text-sm text-[#A78BFA]/70 text-center mb-6 leading-relaxed">
              지금까지의 <span className="text-[#A78BFA] font-bold">Day {dayNumber}</span> 기록이 모두 초기화됩니다.
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleResetConfirm}
                className="w-full bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-[0_0_16px_rgba(185,28,28,0.4)] active:scale-95"
              >
                리셋 확인
              </button>
              <button
                onClick={() => setShowResetDialog(false)}
                className="w-full bg-[#1A1035] hover:bg-[#2D1F5E] active:bg-[#1A1035] text-[#A78BFA] font-semibold py-3 px-6 rounded-xl border border-[#4F46E5]/50 transition-all duration-200 active:scale-95"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
