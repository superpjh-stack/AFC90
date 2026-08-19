# 진행 상황

마지막 갱신: 2026-08-18

## 이 프로젝트가 하는 일

`AFC 200` (Alcohol Free Challenge 200) — **200일 금주 챌린지** 모바일 웹.
매일 도장을 찍어 기록을 쌓고, 마일스톤 배지 8종과 일차별 신체 변화 인포그래픽으로
200일 완주를 돕는다. 백엔드 없이 `localStorage`만 쓰는 MVP.

Vite 5 + React 18 + Tailwind 3, 순수 JSX(타입스크립트·테스트·린터 없음). Vercel 배포.
`react-router-dom`이 의존성에 있지만 **쓰지 않는다** — 네비게이션은 `src/App.jsx`의
한글 키 `pageMap` + `useState`다.

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

**원래 90일 챌린지(AFC 90)였고, 2026-08-18에 200일로 전환했다.** 폴더·저장소 이름
`AFC90`과 git remote는 일부러 그대로 뒀다.

### 단일 출처 (여기만 고치면 전 화면에 반영된다)

| 파일 | 내용 |
|---|---|
| `src/data/challenge.js` | `CHALLENGE_DAYS = 200`, `CHALLENGE_NAME`, `MILESTONES` 8종, `isMilestoneUnlocked()` |
| `src/data/bodyChanges.js` | `BODY_CHANGES.stages` 6단계, `getBodyChangeForDay()` |

전환 전에는 `MILESTONES`가 5개 파일에, 신체변화 단계가 3개 파일에 복붙돼 있었다.
**다시 로컬 배열을 만들지 마라** — 전부 위 두 파일에서 import 한다.

## 지금까지 끝난 것

### 90일 → 200일 전환 — 완료 (코드 + 기획 문서 전부)

커밋하지 않은 작업 트리 상태다. 16개 파일 수정 + `src/data/challenge.js` 신규 +
`src/data/content.js` 삭제. `+283 / -428`.

**마일스톤 5종 → 8종.** 기존 날짜(3·7·21·50·90)는 그대로 두고 100·150·200을 추가했다.
200일 기준에서 의미가 깨지는 두 배지는 이름을 알맞은 날짜로 옮겼다.

| Day | 3 | 7 | 21 | 50 | 90 | 100 | 150 | 200 |
|---|---|---|---|---|---|---|---|---|
| | 첫 고비 돌파 🌱 | 일주일 챔피언 🏅 | 습관의 씨앗 🌿 | 흔들리지 않는 마음 ⚡ | 세포 재생 완성 🧬 | **절반의 영웅** 💯 | 결승선이 보인다 🚀 | **AFC 완주자** 🏆 |

"절반의 영웅"은 50일 → 100일(진짜 절반)로, "AFC 완주자"는 90일 → 200일로 이동했다.
빈 자리는 "흔들리지 않는 마음", "세포 재생 완성"으로 채웠다.

**신체변화 4단계 → 6단계.** `91-150 재생 완성기 🧬`, `151-200 새로운 나 👑` 추가.
신체 부위에 `🩸 혈액·면역`(91일~), `🧘 정신력`(151일~)을 더해 후반부가 비지 않게 했다.

**캘린더 200칸.** `Day 1–50` 등 50일 단위 4섹션으로 나눠 렌더링. 3자리 일차 때문에
셀 폰트를 `text-[8px] tabular-nums`로 낮췄다.

**중복 제거.** `Calendar/Dashboard/MyPage/useAFC`의 로컬 `MILESTONES` 4벌과
`BodyTracker`의 로컬 `STAGES` 삭제. import 되지 않던 죽은 파일 `src/data/content.js`
(90일 문구 12곳 보유) 제거.

**기획 문서 3종.** `docs/problem.md`의 "왜 90일인가"를 "왜 200일인가"로 재작성 —
90일까지의 근거는 중간 마일스톤으로 유지하고, 습관 자동화 기간(평균 66일·최대 254일,
Lally et al. 2010, 출처 명시)과 재발 고위험 구간(3~6개월) 통과를 200일의 근거로 세웠다.
`docs/intro.md`·`docs/spec.md`도 8종 배지표·6단계 로드맵으로 갱신.

**브랜딩.** `index.html` title, `package.json` name(`afc200`), `README.md`, 온보딩·
대시보드·SOS 문구 전부 AFC 200 / 200일로.

### 함께 고친 버그 3건

1. **localStorage 마이그레이션** — 키를 `afc90_*` → `afc200_*`로 바꾸면서 1회성 이관을
   넣었다. 이게 없으면 기존 사용자 체크인 기록이 전부 날아간다. 레거시 키는 보존해
   롤백이 가능하고, 새 키에 값이 있으면 덮어쓰지 않는다.
2. **Dashboard "다음 목표" 고착** — 완주 후에도 마지막 마일스톤이 계속 다음 목표로
   떴다. `getNextMilestone`이 `null`을 반환하고 "🏆 전 배지 달성!"으로 분기한다.
3. **해금 조건 불일치** — Calendar는 `dayNumber > m.day || completedDays >= m.day`,
   Dashboard는 `dayNumber >= m.day`로 서로 달랐다. `isMilestoneUnlocked()`로 통일.

### 검증 — 전부 통과

Chrome 확장이 연결돼 있지 않아 **브라우저 대신 서버 렌더링으로** 검증했다.

- `npm run build` 통과
- 5개 화면 × Day 1/90/120/200/221 **전부 렌더 성공** (캘린더 셀 200개, 섹션 라벨 4개)
- 로직: 마일스톤 8종·해금 규칙, 1–400일 전 구간 단계 매칭 누락 0건,
  Day 91/200/250에서 current 단계 정확히 1개, 진행률 100일=50%·250일=100%
- 마이그레이션 3개 시나리오 (이관 / 덮어쓰기 금지 / localStorage 부재 시 무해)

## 지금 해야 할 것

1. **브라우저에서 눈으로 확인** — 아직 못 한 유일한 항목이다. `npm run dev` 후
   `http://localhost:5173`. 온보딩 시작일을 **과거 날짜**로 넣어야 후반 구간이 보인다.
   - 오늘 −120일 → 대시보드 다음 목표 150일, 신체변화 "재생 완성기" 진행 중, 진행바 60%
   - 오늘 −220일 → 마지막 단계가 여전히 진행 중이고 화면이 비지 않는지 (회귀 테스트)
   - 캘린더 200칸이 4섹션으로 끊겨 보이는지, 3자리 숫자가 셀을 넘치지 않는지
   - SOS 모달 붉은 그라데이션 애니메이션이 안 깨졌는지 (`90deg` 오변경 방지)
   - 마이그레이션: DevTools에서 `afc90_profile`·`afc90_checkins`만 넣고 새로고침 →
     `afc200_*`로 옮겨지고 기록이 유지되는지
2. **커밋** — 사용자가 아직 커밋을 지시하지 않았다. 브랜치는 `main`이므로 브랜치를
   먼저 파는 게 맞는지 물어볼 것.
3. (선택) `/pdca analyze AFC200` 재실행 — `docs/03-analysis/AFC90.analysis.md`는 지난
   사이클의 **기록물**이라 일부러 안 건드렸다. 새 리포트를 만들려면 이걸 돌린다.

## 알아둘 것

### "90" 검색은 오탐이 절반이다

바꾸면 **안 되는** 것들:

- CSS `linear-gradient(90deg, …)` — `SOSModal.jsx`, `BadgeModal.jsx`, `index.css`
- Tailwind `active:scale-90` — `NavBar.jsx`, `Dashboard.jsx`
- `setTimeout(…, 900)` — `Dashboard.jsx` 스탬프 애니메이션
- **`CLAUDE.md`와 `docs/03-analysis`의 "90% match rate"** — PDCA 일치율 임계값이지
  챌린지 기간이 아니다
- `App.jsx:59-90` 같은 문서 내 줄 번호 표기

지금 남아 있는 "90"은 전부 의도된 것이다: 90일 마일스톤 문구, `range: [31, 90]`,
레거시 키 주석, 배지 목록 `3·7·21·50·90·100·150·200`.

### 마지막 단계 상한은 반드시 `Infinity`

`bodyChanges.js` 6번째 단계의 `range`는 `[151, Infinity]`다(표시 라벨만 `151-200`).
여기에 200을 박으면 Day 201부터 진행 중인 단계가 사라진다 — 전환 전 `[31, 90]`이
바로 그래서 Day 91부터 모든 단계가 "완료"로 뜨고 현재 단계가 없어졌다.
크래시는 아니었다(`currentStageIndex`는 계산만 하고 아무 데도 안 쓰는 죽은 변수).

### 브라우저 없이 검증하는 법

Chrome 확장(`mcp__claude-in-chrome__*`)이 연결 안 돼 있으면 SSR로 대신한다.
함정 세 개를 만났다:

1. **esbuild에 `--jsx=automatic`을 줘야 한다.** 안 주면 classic 변환이 걸려
   React를 import 안 하는 컴포넌트(Dashboard·MyPage·Onboarding)가 전부
   `React is not defined`로 죽는다. 앱 버그가 아니라 하네스 문제다.
2. **`--format=cjs`로 뽑아라.** esm으로 뽑으면 `react-dom/server`가
   `Dynamic require of "stream" is not supported`로 죽는다.
3. **검증 스크립트는 프로젝트 루트에 둬야 한다.** scratchpad에 두면 esbuild가
   `node_modules`의 react를 못 찾는다. 임시 파일로 만들고 끝나면 지운다.

`useAFC.js`의 마이그레이션은 **모듈 로드 시점에 즉시 실행**된다. 그래서 가짜
`localStorage`를 심는 테스트는 정적 import로는 못 한다(ESM import 호이스팅 때문에
모듈이 먼저 돈다) — `await import()`로 동적 로드할 것.

Node로 `src/`를 직접 돌리면 `Cannot find module .../challenge`가 난다. Vite는
확장자 없는 import를 해석하지만 Node ESM은 못 한다. esbuild 번들을 거쳐야 한다.

### 사용자가 정한 것

- 브랜드명은 **AFC 200**으로 변경 (폴더·저장소 이름은 유지)
- 마일스톤은 **기존 유지 + 뒤에 추가** 방식 (전면 재배치나 비례 스케일링 아님)
