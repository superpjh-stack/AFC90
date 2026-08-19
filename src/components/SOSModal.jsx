import { useEffect, useState } from 'react';

const sosMessages = [
  "지금 이 순간의 충동은 15분이면 사라집니다. 딱 15분만 버텨보세요.",
  "당신이 지금까지 버텨온 {day}일을 기억하세요. 그 시간이 얼마나 소중한지 아시잖아요.",
  "술 한 잔의 유혹보다, 200일 후 달라진 내 모습이 훨씬 더 값집니다.",
  "지금 당장 차가운 물 한 잔 마시고 심호흡 세 번 해보세요. 그것만으로도 충분합니다.",
  "어떤 감정도 영원하지 않습니다. 지금의 힘든 감정도 곧 지나갑니다. 당신은 강합니다.",
  "오늘 하루만 생각하세요. 200일이 아니라, 오늘 딱 하루만 버티면 됩니다.",
  "당신을 응원하는 사람들이 있습니다. 그분들을 위해서라도 오늘은 버텨봅시다.",
  "몸이 보내는 신호에 귀 기울여보세요. 지금 몸은 회복 중입니다. 방해하지 마세요.",
  "이 고비를 넘기면 내일의 당신은 오늘의 결정에 감사할 것입니다.",
  "잠깐 밖으로 나가 신선한 공기를 마셔보세요. 자리를 바꾸는 것만으로도 충동이 줄어듭니다.",
];

export default function SOSModal({ isOpen, onClose, dayNumber = 1 }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const idx = Math.floor(Math.random() * sosMessages.length);
      setMessage(sosMessages[idx].replace('{day}', dayNumber));
    }
  }, [isOpen, dayNumber]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(185,28,28,0.6) 0%, rgba(124,58,237,0.4) 50%, transparent 80%)',
        }}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-[320px] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(135deg, #1A1035 0%, #2D1F5E 50%, #1A0A0A 100%)',
          border: '1px solid rgba(220,38,38,0.4)',
          boxShadow:
            '0 0 0 1px rgba(220,38,38,0.2), 0 0 60px rgba(220,38,38,0.3), 0 24px 48px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top accent line */}
        <div
          className="h-1 w-full"
          style={{
            background:
              'linear-gradient(90deg, #DC2626, #7C3AED, #DC2626)',
          }}
        />

        <div className="p-6 flex flex-col items-center gap-5">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: 'rgba(220,38,38,0.15)',
              border: '2px solid rgba(220,38,38,0.4)',
              boxShadow: '0 0 24px rgba(220,38,38,0.3)',
            }}
          >
            🆘
          </div>

          {/* Title */}
          <div className="text-center">
            <h2
              className="text-xl font-black tracking-tight leading-tight"
              style={{ color: '#F1F0F9' }}
            >
              지금 이 순간만
            </h2>
            <h2
              className="text-xl font-black tracking-tight leading-tight"
              style={{
                background: 'linear-gradient(90deg, #EF4444, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              버티세요
            </h2>
          </div>

          {/* Divider */}
          <div
            className="w-12 h-px"
            style={{ background: 'rgba(220,38,38,0.4)' }}
          />

          {/* Message */}
          <p
            className="text-sm leading-relaxed text-center"
            style={{ color: '#F1F0F9', opacity: 0.9 }}
          >
            {message}
          </p>

          {/* Breathing cue */}
          <div
            className="w-full rounded-2xl p-3 text-center"
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
          >
            <p
              className="text-[11px] font-medium uppercase tracking-widest mb-1"
              style={{ color: '#A78BFA' }}
            >
              지금 바로
            </p>
            <p className="text-xs" style={{ color: '#F1F0F9', opacity: 0.75 }}>
              숨을 천천히 들이쉬고 — 4초 — 내쉬세요
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95"
            style={{
              background: 'rgba(220,38,38,0.15)',
              border: '1px solid rgba(220,38,38,0.4)',
              color: '#FCA5A5',
              boxShadow: '0 0 16px rgba(220,38,38,0.2)',
            }}
          >
            고비를 넘겼습니다 💪
          </button>
        </div>
      </div>
    </div>
  );
}
