/**
 * Single source of truth for the challenge length, brand name, and milestones.
 * Every component must import from here — do not copy these arrays.
 */

export const CHALLENGE_DAYS = 200;
export const CHALLENGE_NAME = "AFC 200";

export const MILESTONES = [
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
      "21일! 과학이 증명한 습관 형성의 마법 숫자를 달성했습니다. 금주가 이제 당신의 새로운 일상이 되었어요. 피부는 맑아지고, 에너지는 넘칩니다. 아직 시작일 뿐, 200일까지 함께 달려봅시다!",
  },
  {
    day: 50,
    name: "흔들리지 않는 마음",
    emoji: "⚡",
    message:
      "50일! 이제 술자리 앞에서도 흔들리지 않는 사람이 되었습니다. 간이 눈에 띄게 회복되고, 뇌 기능도 제자리를 찾아가고 있어요. 여기까지 온 사람은 많지 않습니다. 다음은 90일, 세포 재생의 완성입니다!",
  },
  {
    day: 90,
    name: "세포 재생 완성",
    emoji: "🧬",
    message:
      "90일! 적혈구가 완전히 새로 태어나고, 도파민 수용체가 정상으로 돌아왔습니다. 세포 수준에서 당신은 이미 다른 사람입니다. 그리고 놀랍게도 — 아직 절반도 오지 않았어요. 100일 반환점이 코앞입니다!",
  },
  {
    day: 100,
    name: "절반의 영웅",
    emoji: "💯",
    message:
      "100일! 200일 챌린지의 정확히 절반을 넘었습니다. 세 자리 수를 찍은 당신은 이제 '금주하는 사람'이 아니라 '술을 마시지 않는 사람'입니다. 남은 절반은 지나온 절반보다 훨씬 수월할 거예요!",
  },
  {
    day: 150,
    name: "결승선이 보인다",
    emoji: "🚀",
    message:
      "150일! 재발 위험이 가장 높다는 6개월 구간을 통과하고 있습니다. 이 지점을 넘긴 사람은 다시 돌아가지 않습니다. 결승선까지 딱 50일, 마지막 스퍼트를 올려보세요!",
  },
  {
    day: 200,
    name: "AFC 완주자",
    emoji: "🏆",
    message:
      "200일 완주!! 당신은 해냈습니다! 간이 완전히 회복되고, 심혈관 건강이 크게 개선됐으며, 금주는 더 이상 의지가 아니라 당신의 일상이 되었습니다. AFC 완주자의 자격으로, 앞으로의 모든 도전도 이겨낼 수 있습니다. 정말 자랑스럽습니다!",
  },
];

/** Unified unlock rule — keep every screen consistent. */
export function isMilestoneUnlocked(milestone, dayNumber) {
  return dayNumber >= milestone.day;
}
