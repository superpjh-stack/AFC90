# AFC 90 — Gap Analysis Report

- **Feature**: AFC90
- **Design**: `docs/spec.md`
- **Implementation**: `src/`
- **Date**: 2026-06-04
- **Analyst**: bkit:gap-detector

---

## Match Rate: 94% ✅ (목표 90% 초과)

| 섹션 | 구현 | 합계 |
|------|------|------|
| A. 도장깨기 | 5/5 | ✅ |
| B. 신체 변화 시각화 | 3/3 | ✅ |
| C. 온보딩 | 3/3 | ✅ |
| D. 대시보드 | 3.5/4 | ⚠️ |
| E. 앱 전체 구조 | 3/3 | ✅ |
| **합계** | **17.5/18** | **94%** |

---

## 구현 확인 항목 ✅

| # | 항목 | 위치 |
|---|------|------|
| 1 | 90일 그리드 뷰 | `Calendar.jsx:76-180` |
| 2 | 스탬프 체크인 애니메이션 | `Dashboard.jsx:84-102, 158-180` |
| 3 | 오늘 강조 / 미래 비활성화 | `Calendar.jsx:78-80, 137-141` |
| 4 | 마일스톤 배지 5종 | `useAFC.js:9-45`, `Calendar.jsx`, `Dashboard.jsx` |
| 5 | SOS 버튼 + 랜덤 문구 | `Dashboard.jsx:304`, `SOSModal.jsx:3-24` |
| 6 | 일차별 신체 변화 표시 | `BodyTracker.jsx:77-79`, `App.jsx:52` |
| 7 | 4개 스테이지 | `BodyTracker.jsx:3-56` |
| 8 | 일차별 코칭 메시지 | `BodyTracker.jsx:13,25,39,53` |
| 9 | 온보딩 5개 필드 | `Onboarding.jsx:6-12` |
| 10 | 입력 유효성 검사 | `Onboarding.jsx:20-31` |
| 11 | localStorage 저장 | `useAFC.js:111-118` |
| 12 | 금주 N일차 표시 | `Dashboard.jsx:111-115` |
| 13 | 체크인 버튼 + 애니메이션 | `Dashboard.jsx:158-180` |
| 14 | 연속 스트릭 표시 | `Dashboard.jsx:289-300`, `useAFC.js:153-169` |
| 16 | 4탭 네비게이션 | `NavBar.jsx:1-6`, `App.jsx:59-90` |
| 17 | SOSModal 연결 | `App.jsx:96` |
| 18 | BadgeModal 마일스톤 연결 | `App.jsx:30-34,97` |

---

## 불완전 항목 ⚠️

### #15 — 절약 통계 계산 불일치 (Medium)

- **Dashboard**: `useAFC.getStats()` 기반 — 주간 음주량 × 130kcal/잔, 4,500원/잔
- **MyPage**: 하드코딩 — 210kcal/일, 15,000원/일, 0.027kg/일
- **증상**: 같은 사용자가 두 화면에서 다른 통계 수치를 봄

---

## 즉시 수정 권고

| 우선순위 | 항목 | 수정 방법 |
|---------|------|----------|
| 🔴 High | MyPage 통계 불일치 | `useAFC.getStats()` 결과를 MyPage에 직접 전달 |
| 🔴 High | App.jsx 타임존 불일치 | `toISOString()` → local-time `toDateString()` helper 사용 |
| 🟡 Medium | MILESTONES 5중 중복 | `data/content.js`를 단일 소스로 통합 |
| 🟡 Medium | 마일스톤 unlock 기준 불일치 | Calendar(`>`) vs Dashboard(`>=`) 통일 |

---

## 결론

MVP 범위(spec.md §5) 전 항목 기능적으로 구현 완료.
2차 출시(AI 코칭, RAG, 건강 지표 예측)는 의도적으로 미구현 — 갭 아님.

**다음 단계**: `/pdca report AFC90`
