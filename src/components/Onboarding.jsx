import { useState } from 'react';

const today = new Date().toISOString().split('T')[0];

export default function Onboarding({ onComplete }) {
  const [form, setForm] = useState({
    name: '',
    height: '',
    weight: '',
    weeklyDrinks: '',
    startDate: today,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = '이름을 입력해주세요.';
    if (!form.height || isNaN(form.height) || Number(form.height) <= 0)
      newErrors.height = '올바른 키를 입력해주세요.';
    if (!form.weight || isNaN(form.weight) || Number(form.weight) <= 0)
      newErrors.weight = '올바른 몸무게를 입력해주세요.';
    if (form.weeklyDrinks === '' || isNaN(form.weeklyDrinks) || Number(form.weeklyDrinks) < 0)
      newErrors.weeklyDrinks = '주간 음주량을 입력해주세요.';
    if (!form.startDate) newErrors.startDate = '시작일을 선택해주세요.';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onComplete({
      name: form.name.trim(),
      height: Number(form.height),
      weight: Number(form.weight),
      weeklyDrinks: Number(form.weeklyDrinks),
      startDate: form.startDate,
    });
  };

  return (
    <div className="font-['Pretendard',_'Noto_Sans_KR',_sans-serif] min-h-screen bg-[#0F0A1E] text-[#F1F0F9] max-w-[360px] mx-auto relative overflow-x-hidden">
      {/* Scrollable content area */}
      <div className="overflow-y-auto min-h-screen pb-8">
        {/* Hero section */}
        <div className="flex flex-col items-center pt-12 pb-8 px-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center shadow-[0_0_32px_rgba(124,58,237,0.3)] mb-1">
              <span className="text-4xl" role="img" aria-label="no alcohol">🚫🍺</span>
            </div>
            <h1 className="text-2xl font-bold text-[#F1F0F9] tracking-tight leading-tight">
              AFC 200
            </h1>
            <p className="text-xs text-[#A78BFA]/60 tracking-widest uppercase font-medium">
              술 없이 200일, 진짜 나를 되찾다
            </p>
          </div>

          {/* Subtitle */}
          <div className="bg-[#1A1035] rounded-2xl p-4 shadow-lg border border-[#7C3AED]/20 backdrop-blur-sm w-full text-center">
            <h2 className="text-lg font-semibold text-[#F1F0F9] tracking-tight mb-2">
              AFC 200 챌린지 시작하기
            </h2>
            <p className="text-sm text-[#A78BFA]/80 leading-relaxed">
              200일 후, 당신은 완전히 달라집니다.{'\n'}
              <span className="block mt-1">지금 이 순간이 변화의 첫 걸음입니다.</span>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 flex flex-col gap-4">
          {/* 이름 */}
          <div>
            <label className="block text-xs font-medium text-[#A78BFA] mb-1 tracking-wide uppercase">
              이름
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="홍길동"
              className="w-full bg-[#0F0A1E] border border-[#4F46E5]/40 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 text-[#F1F0F9] placeholder-[#A78BFA]/40 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          {/* 키 */}
          <div>
            <label className="block text-xs font-medium text-[#A78BFA] mb-1 tracking-wide uppercase">
              키
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.height}
                onChange={handleChange('height')}
                placeholder="170"
                min="100"
                max="250"
                className="w-full bg-[#0F0A1E] border border-[#4F46E5]/40 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 text-[#F1F0F9] placeholder-[#A78BFA]/40 rounded-xl px-4 py-3 pr-14 text-sm outline-none transition-all duration-200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#A78BFA]/60 font-medium">
                cm
              </span>
            </div>
            {errors.height && (
              <p className="text-xs text-red-400 mt-1">{errors.height}</p>
            )}
          </div>

          {/* 몸무게 */}
          <div>
            <label className="block text-xs font-medium text-[#A78BFA] mb-1 tracking-wide uppercase">
              몸무게
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.weight}
                onChange={handleChange('weight')}
                placeholder="70"
                min="30"
                max="300"
                className="w-full bg-[#0F0A1E] border border-[#4F46E5]/40 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 text-[#F1F0F9] placeholder-[#A78BFA]/40 rounded-xl px-4 py-3 pr-14 text-sm outline-none transition-all duration-200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#A78BFA]/60 font-medium">
                kg
              </span>
            </div>
            {errors.weight && (
              <p className="text-xs text-red-400 mt-1">{errors.weight}</p>
            )}
          </div>

          {/* 주간 음주량 */}
          <div>
            <label className="block text-xs font-medium text-[#A78BFA] mb-1 tracking-wide uppercase">
              주간 음주량
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.weeklyDrinks}
                onChange={handleChange('weeklyDrinks')}
                placeholder="7"
                min="0"
                max="100"
                className="w-full bg-[#0F0A1E] border border-[#4F46E5]/40 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 text-[#F1F0F9] placeholder-[#A78BFA]/40 rounded-xl px-4 py-3 pr-16 text-sm outline-none transition-all duration-200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#A78BFA]/60 font-medium">
                잔/주
              </span>
            </div>
            {errors.weeklyDrinks && (
              <p className="text-xs text-red-400 mt-1">{errors.weeklyDrinks}</p>
            )}
          </div>

          {/* 금주 시작일 */}
          <div>
            <label className="block text-xs font-medium text-[#A78BFA] mb-1 tracking-wide uppercase">
              금주 시작일
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={handleChange('startDate')}
              className="w-full bg-[#0F0A1E] border border-[#4F46E5]/40 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 text-[#F1F0F9] rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 [color-scheme:dark]"
            />
            {errors.startDate && (
              <p className="text-xs text-red-400 mt-1">{errors.startDate}</p>
            )}
          </div>

          {/* Motivational hint */}
          <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-xl px-4 py-3 flex items-start gap-3">
            <span className="text-lg mt-0.5" role="img" aria-label="fire">🔥</span>
            <p className="text-xs text-[#A78BFA]/80 leading-relaxed">
              200일 챌린지를 완료하면 평균{' '}
              <span className="text-[#A78BFA] font-semibold">5–8kg 감량</span>과{' '}
              <span className="text-[#A78BFA] font-semibold">수면 질 향상</span>을 경험합니다.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-[0_0_16px_rgba(124,58,237,0.4)] active:scale-95 mt-2"
          >
            🚀 200일 챌린지 시작하기
          </button>

          <p className="text-xs text-[#A78BFA]/40 text-center pb-4">
            언제든지 설정에서 정보를 수정할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
