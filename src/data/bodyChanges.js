export const BODY_CHANGES = {
  title: "내 몸의 변화",
  stages: [
    {
      days: "1-3",
      title: "해독기",
      icon: "🌊",
      changes: [
        "알코올이 몸에서 빠져나가며 해독이 시작됩니다",
        "두통, 피로감, 불면 등 금단 증상이 나타날 수 있어요",
      ],
      coaching:
        "가장 힘든 72시간입니다. 물을 자주 마시고 충분히 쉬세요. 이 고비만 넘기면 됩니다.",
    },
    {
      days: "4-7",
      title: "회복의 시작",
      icon: "🌅",
      changes: [
        "수면의 질이 눈에 띄게 좋아집니다",
        "간 염증 수치가 빠르게 회복되기 시작합니다",
      ],
      coaching:
        "몸이 조금씩 가벼워지는 걸 느끼실 거예요. 일주일, 정말 대단한 첫 걸음입니다.",
    },
    {
      days: "8-30",
      title: "대사 개선기",
      icon: "⚡",
      changes: [
        "피부 톤이 밝아지고 얼굴 부기가 빠집니다",
        "체중이 자연스럽게 줄어들고 에너지가 넘칩니다",
        "뇌 기능이 회복되어 집중력과 기억력이 향상됩니다",
        "심박수와 혈압이 정상 범위로 안정됩니다",
      ],
      coaching:
        "변화가 눈에 보이기 시작하는 시기입니다. 주변 사람들도 달라진 당신을 알아챌 거예요.",
    },
    {
      days: "31-90",
      title: "습관 정착기",
      icon: "🌿",
      changes: [
        "간이 완전히 회복되어 해독 능력이 최고조에 달합니다",
        "심혈관 건강이 크게 개선되고 암 위험도 낮아집니다",
        "수면 패턴이 완전히 정상화됩니다",
        "자존감과 정신 건강이 눈에 띄게 향상됩니다",
      ],
      coaching:
        "이제 금주는 당신의 일부가 되었습니다. 90일 완주를 향해 마지막 스퍼트를 올려보세요!",
    },
  ],
};

/**
 * Returns the body-change stage that corresponds to the given day number (1-based).
 * Falls back to the last stage if day > 90.
 *
 * @param {number} day - Current challenge day (1–90+)
 * @returns {{ days: string, title: string, icon: string, changes: string[], coaching: string }}
 */
export function getBodyChangeForDay(day) {
  const ranges = [
    { min: 1, max: 3, index: 0 },
    { min: 4, max: 7, index: 1 },
    { min: 8, max: 30, index: 2 },
    { min: 31, max: Infinity, index: 3 },
  ];

  const match = ranges.find((r) => day >= r.min && day <= r.max);
  const index = match ? match.index : BODY_CHANGES.stages.length - 1;
  return BODY_CHANGES.stages[index];
}
