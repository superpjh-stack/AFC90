export const BODY_CHANGES = {
  title: "내 몸의 변화",
  stages: [
    {
      days: "1-3",
      range: [1, 3],
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
      range: [4, 7],
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
      range: [8, 30],
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
      range: [31, 90],
      title: "습관 정착기",
      icon: "🌿",
      changes: [
        "간 지방이 크게 줄고 해독 능력이 회복됩니다",
        "심혈관 건강이 개선되고 혈압·콜레스테롤이 안정화됩니다",
        "수면 패턴이 완전히 정상화됩니다",
        "자존감과 정신 건강이 눈에 띄게 향상됩니다",
      ],
      coaching:
        "이제 금주는 당신의 일부가 되었습니다. 90일 세포 재생 완성을 향해 달려보세요!",
    },
    {
      days: "91-150",
      range: [91, 150],
      title: "재생 완성기",
      icon: "🧬",
      changes: [
        "적혈구가 완전히 새로 교체되어 산소 운반 능력이 회복됩니다",
        "도파민 수용체가 정상화되어 술 없이도 즐거움을 느낍니다",
        "면역 기능이 회복되고 잔병치레가 줄어듭니다",
        "간 수치(GGT·ALT)가 정상 범위로 돌아옵니다",
      ],
      coaching:
        "세포 수준의 재생이 끝나는 구간입니다. 여기서부터는 '버티는 것'이 아니라 '유지하는 것'이에요.",
    },
    {
      days: "151-200",
      range: [151, Infinity],
      title: "새로운 나",
      icon: "👑",
      changes: [
        "금주가 의지가 아닌 자동화된 습관으로 자리 잡습니다",
        "재발 위험이 가장 높은 6개월 구간을 통과합니다",
        "장기 음주로 인한 암·심혈관 질환 위험이 뚜렷하게 낮아집니다",
        "감정 기복이 줄고 스트레스 대처 능력이 향상됩니다",
      ],
      coaching:
        "술 없는 삶이 기본값이 된 단계입니다. 200일 완주까지, 그리고 그 이후로도 이 리듬을 지켜가세요.",
    },
  ],
};

/**
 * Returns the body-change stage that corresponds to the given day number (1-based).
 * The final stage is open-ended, so days past the challenge length still resolve.
 *
 * @param {number} day - Current challenge day (1–200+)
 * @returns {{ days: string, range: number[], title: string, icon: string, changes: string[], coaching: string }}
 */
export function getBodyChangeForDay(day) {
  const match = BODY_CHANGES.stages.find(
    (s) => day >= s.range[0] && day <= s.range[1]
  );
  return match || BODY_CHANGES.stages[BODY_CHANGES.stages.length - 1];
}
