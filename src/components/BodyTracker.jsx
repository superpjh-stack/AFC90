import React, { useState } from 'react';

const STAGES = [
  {
    days: '1-3',
    range: [1, 3],
    title: '해독기',
    icon: '🌊',
    changes: [
      '알코올이 몸에서 빠져나가며 해독이 시작됩니다',
      '두통, 피로감, 불면 등 금단 증상이 나타날 수 있어요',
    ],
    coaching:
      '가장 힘든 72시간입니다. 물을 자주 마시고 충분히 쉬세요. 이 고비만 넘기면 됩니다.',
  },
  {
    days: '4-7',
    range: [4, 7],
    title: '회복의 시작',
    icon: '🌅',
    changes: [
      '수면의 질이 눈에 띄게 좋아집니다',
      '간 염증 수치가 빠르게 회복되기 시작합니다',
    ],
    coaching:
      '몸이 조금씩 가벼워지는 걸 느끼실 거예요. 일주일, 정말 대단한 첫 걸음입니다.',
  },
  {
    days: '8-30',
    range: [8, 30],
    title: '대사 개선기',
    icon: '⚡',
    changes: [
      '피부 톤이 밝아지고 얼굴 부기가 빠집니다',
      '체중이 자연스럽게 줄어들고 에너지가 넘칩니다',
      '뇌 기능이 회복되어 집중력과 기억력이 향상됩니다',
      '심박수와 혈압이 정상 범위로 안정됩니다',
    ],
    coaching:
      '변화가 눈에 보이기 시작하는 시기입니다. 주변 사람들도 달라진 당신을 알아챌 거예요.',
  },
  {
    days: '31-90',
    range: [31, 90],
    title: '습관 정착기',
    icon: '🌿',
    changes: [
      '간이 완전히 회복되어 해독 능력이 최고조에 달합니다',
      '심혈관 건강이 크게 개선되고 암 위험도 낮아집니다',
      '수면 패턴이 완전히 정상화됩니다',
      '자존감과 정신 건강이 눈에 띄게 향상됩니다',
    ],
    coaching:
      '이제 금주는 당신의 일부가 되었습니다. 90일 완주를 향해 마지막 스퍼트를 올려보세요!',
  },
];

const BODY_PARTS = [
  { icon: '🫀', label: '간', key: 'liver', activeFrom: 1 },
  { icon: '🧠', label: '뇌', key: 'brain', activeFrom: 8 },
  { icon: '✨', label: '피부', key: 'skin', activeFrom: 8 },
  { icon: '😴', label: '수면', key: 'sleep', activeFrom: 4 },
  { icon: '⚖️', label: '체중', key: 'weight', activeFrom: 8 },
  { icon: '❤️', label: '심혈관', key: 'cardio', activeFrom: 31 },
];

function getStageStatus(stageRange, dayNumber) {
  const [start, end] = stageRange;
  if (dayNumber >= start && dayNumber <= end) return 'current';
  if (dayNumber > end) return 'completed';
  return 'future';
}

export default function BodyTracker({ dayNumber = 1 }) {
  const [expandedFuture, setExpandedFuture] = useState(null);

  const currentStageIndex = STAGES.findIndex(
    (s) => dayNumber >= s.range[0] && dayNumber <= s.range[1]
  );

  return (
    <div className="font-['Pretendard',_'Noto_Sans_KR',_sans-serif] px-4 py-5 pb-28">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#F1F0F9] tracking-tight leading-tight">
          내 몸의 변화
        </h2>
        <p className="text-xs text-[#A78BFA]/60 mt-1">
          {dayNumber}일차 · 금주하는 동안 몸이 이렇게 변화합니다
        </p>
      </div>

      {/* Body Parts Grid */}
      <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm mb-6">
        <p className="text-xs font-medium text-[#A78BFA] mb-3 tracking-wide uppercase">
          신체 부위별 회복 현황
        </p>
        <div className="grid grid-cols-3 gap-3">
          {BODY_PARTS.map((part) => {
            const active = dayNumber >= part.activeFrom;
            return (
              <div
                key={part.key}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-300 ${
                  active
                    ? 'bg-[#7C3AED]/15 border-[#7C3AED]/40 shadow-[0_0_12px_rgba(124,58,237,0.2)]'
                    : 'bg-[#0F0A1E] border-[#4F46E5]/20 opacity-40 grayscale'
                }`}
              >
                <span className="text-2xl leading-none">{part.icon}</span>
                <span
                  className={`text-[10px] font-semibold ${
                    active ? 'text-[#A78BFA]' : 'text-[#A78BFA]/40'
                  }`}
                >
                  {part.label}
                </span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_6px_rgba(124,58,237,0.8)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-[#4F46E5]/20" />

        <div className="flex flex-col gap-3">
          {STAGES.map((stage, idx) => {
            const status = getStageStatus(stage.range, dayNumber);
            const isCurrent = status === 'current';
            const isCompleted = status === 'completed';
            const isFuture = status === 'future';
            const isExpandedFuture = expandedFuture === idx;

            return (
              <div key={stage.days} className="relative pl-14">
                {/* Timeline node */}
                <div className="absolute left-0 top-3 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.7)] border-2 border-[#A78BFA]/60">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : isCurrent ? (
                    <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 border-2 border-[#7C3AED] flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)] animate-pulse">
                      <span className="text-lg leading-none">{stage.icon}</span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1A1035] border border-[#4F46E5]/30 flex items-center justify-center opacity-40 grayscale">
                      <span className="text-lg leading-none">{stage.icon}</span>
                    </div>
                  )}
                </div>

                {/* Card */}
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#1A1035] border-[#7C3AED]/40 shadow-[0_0_24px_rgba(124,58,237,0.2)]'
                      : isCompleted
                      ? 'bg-[#1A1035] border-[#4F46E5]/30'
                      : 'bg-[#1A1035]/50 border-[#4F46E5]/15 opacity-50'
                  }`}
                >
                  {/* Card header */}
                  <div
                    className={`flex items-center justify-between p-4 ${
                      isFuture ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => {
                      if (isFuture) {
                        setExpandedFuture(isExpandedFuture ? null : idx);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-[#A78BFA]/60 tracking-wide uppercase">
                            Day {stage.days}
                          </span>
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/30">
                              완료
                            </span>
                          )}
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#7C3AED]/30 text-[#A78BFA] border border-[#7C3AED]/50 shadow-[0_0_8px_rgba(124,58,237,0.4)]">
                              진행 중
                            </span>
                          )}
                          {isFuture && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1A1035] text-[#A78BFA]/40 border border-[#4F46E5]/20">
                              🔒 잠김
                            </span>
                          )}
                        </div>
                        <h3
                          className={`text-base font-semibold tracking-tight ${
                            isFuture ? 'text-[#F1F0F9]/40' : 'text-[#F1F0F9]'
                          }`}
                        >
                          {stage.icon} {stage.title}
                        </h3>
                      </div>
                    </div>
                    {isFuture && (
                      <svg
                        className={`w-4 h-4 text-[#A78BFA]/40 transition-transform duration-200 ${
                          isExpandedFuture ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Expanded content: current always shown, completed shown, future toggleable */}
                  {(isCurrent || isCompleted || isExpandedFuture) && (
                    <div className={`px-4 pb-4 ${isFuture ? 'filter blur-[1px]' : ''}`}>
                      {/* Changes list */}
                      <ul className="flex flex-col gap-2 mb-3">
                        {stage.changes.map((change, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span
                              className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                isCurrent
                                  ? 'bg-[#7C3AED] shadow-[0_0_6px_rgba(124,58,237,0.8)]'
                                  : isCompleted
                                  ? 'bg-[#A78BFA]'
                                  : 'bg-[#A78BFA]/30'
                              }`}
                            />
                            <span
                              className={`text-sm leading-relaxed ${
                                isFuture
                                  ? 'text-[#F1F0F9]/30'
                                  : 'text-[#F1F0F9]'
                              }`}
                            >
                              {change}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Coaching message */}
                      {isCurrent && (
                        <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/25 rounded-xl p-3">
                          <p className="text-xs font-medium text-[#A78BFA] mb-1 tracking-wide uppercase">
                            코치의 메시지
                          </p>
                          <p className="text-sm text-[#F1F0F9] leading-relaxed">
                            {stage.coaching}
                          </p>
                        </div>
                      )}
                      {isCompleted && (
                        <div className="bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-xl p-3">
                          <p className="text-sm text-[#A78BFA] leading-relaxed">
                            {stage.coaching}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Future collapsed preview */}
                  {isFuture && !isExpandedFuture && (
                    <div className="px-4 pb-4">
                      <p className="text-xs text-[#A78BFA]/30 leading-relaxed">
                        {stage.range[0]}일 이후에 잠금 해제됩니다
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm mt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-[#A78BFA] tracking-wide uppercase">
            90일 여정
          </p>
          <span className="text-xs font-semibold text-[#A78BFA]">
            {Math.min(Math.round((dayNumber / 90) * 100), 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-[#0F0A1E] rounded-full overflow-hidden border border-[#4F46E5]/20">
          <div
            className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(124,58,237,0.6)]"
            style={{ width: `${Math.min((dayNumber / 90) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-[#A78BFA]/40">Day 1</span>
          <span className="text-[10px] text-[#A78BFA]/40">Day 90</span>
        </div>
      </div>
    </div>
  );
}
