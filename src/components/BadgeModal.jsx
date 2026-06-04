import { useEffect, useState } from 'react';

// Confetti particle component
function ConfettiParticle({ style }) {
  return <div className="absolute pointer-events-none rounded-sm" style={style} />;
}

function Confetti({ active }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    const colors = [
      '#7C3AED', '#A78BFA', '#4F46E5', '#EAB308',
      '#F59E0B', '#10B981', '#EC4899', '#F1F0F9',
    ];
    const generated = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${4 + Math.random() * 6}px`,
      height: `${8 + Math.random() * 8}px`,
      background: colors[Math.floor(Math.random() * colors.length)],
      animationDelay: `${Math.random() * 1.2}s`,
      animationDuration: `${1.6 + Math.random() * 1.4}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }));
    setParticles(generated);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <ConfettiParticle
          key={p.id}
          style={{
            left: p.left,
            top: '-10px',
            width: p.width,
            height: p.height,
            background: p.background,
            transform: p.transform,
            animation: `confetti-fall ${p.animationDuration} ${p.animationDelay} ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

export default function BadgeModal({ milestone, onClose }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (milestone) {
      // Slight delay so animation triggers after mount
      const t = setTimeout(() => setShowConfetti(true), 100);
      return () => clearTimeout(t);
    } else {
      setShowConfetti(false);
    }
  }, [milestone]);

  if (!milestone) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Confetti layer */}
      <Confetti active={showConfetti} />

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(234,179,8,0.5) 0%, rgba(124,58,237,0.3) 40%, transparent 70%)',
        }}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-[320px] rounded-3xl overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #1A1035 0%, #2D1F5E 60%, #1A1205 100%)',
          border: '1px solid rgba(234,179,8,0.5)',
          boxShadow:
            '0 0 0 1px rgba(234,179,8,0.15), 0 0 80px rgba(234,179,8,0.25), 0 32px 64px rgba(0,0,0,0.7)',
        }}
      >
        {/* Rainbow top bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              'linear-gradient(90deg, #7C3AED, #EAB308, #10B981, #EAB308, #7C3AED)',
          }}
        />

        <div className="p-6 flex flex-col items-center gap-5">
          {/* Emoji badge */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: '100px',
                height: '100px',
                background: 'rgba(234,179,8,0.1)',
                border: '2px solid rgba(234,179,8,0.35)',
                boxShadow: '0 0 32px rgba(234,179,8,0.4)',
                animation: 'badge-pulse 2s ease-in-out infinite',
              }}
            />
            <style>{`
              @keyframes badge-pulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50%       { transform: scale(1.08); opacity: 1; }
              }
              @keyframes badge-bounce {
                0%, 100% { transform: translateY(0) scale(1); }
                40%       { transform: translateY(-12px) scale(1.1); }
                60%       { transform: translateY(-6px) scale(1.05); }
              }
            `}</style>
            <span
              className="text-6xl relative z-10"
              style={{ animation: 'badge-bounce 1.2s ease-in-out 0.3s both' }}
            >
              {milestone.emoji}
            </span>
          </div>

          {/* Day counter */}
          <div className="text-center">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: 'rgba(234,179,8,0.8)' }}
            >
              Day {milestone.day} 달성!
            </p>
            <h2
              className="text-2xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(90deg, #EAB308, #F1F0F9, #EAB308)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {milestone.name}
            </h2>
          </div>

          {/* Divider */}
          <div
            className="w-16 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.6), transparent)' }}
          />

          {/* Message */}
          <p
            className="text-sm leading-relaxed text-center"
            style={{ color: '#F1F0F9', opacity: 0.88 }}
          >
            {milestone.message}
          </p>

          {/* Stars row */}
          <div className="flex gap-2 text-xl">
            {['⭐', '⭐', '⭐'].map((s, i) => (
              <span
                key={i}
                style={{
                  animation: `badge-bounce 0.8s ease-in-out ${0.1 + i * 0.15}s both`,
                  display: 'inline-block',
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Confirm button */}
          <button
            onClick={onClose}
            className="w-full font-bold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
              color: '#0F0A1E',
              boxShadow: '0 0 24px rgba(234,179,8,0.5)',
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
