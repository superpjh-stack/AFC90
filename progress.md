# 진행 상황

마지막 갱신: 2026-08-19

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

브랜치 `feat/afc-200`, 커밋 `96d3633`. 18개 파일 `+504 / -428`.
`main`은 그대로 두었고 push는 하지 않았다.

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

1. **GitHub 인증 → push → PR** — 로컬 커밋만 있고 원격에 브랜치가 없다.
   `gh`는 설치돼 있으니 **인증만 하면 된다.** 인증은 사용자가 직접 한다:

   ```
   gh auth login
   ```

   `GitHub.com` → `HTTPS` → `Login with a web browser`를 고르면 일회용 코드가 뜬다.
   **화살표 선택이 있는 TUI라 Terminal.app이나 VS Code 통합 터미널에서 실행하는 게 안전하다.**
   인증이 끝나면 git 자격 증명도 함께 등록되어 push가 조용히 통과한다.

   ```
   git push -u origin feat/afc-200
   ```

   그다음 PR은 아래 URL로 열거나 `gh pr create --base main --fill`로 만든다. 본문 초안은 이 파일의 "PR 본문" 절에 있다.

   ```
   https://github.com/superpjh-stack/AFC90/compare/main...feat/afc-200?expand=1
   ```

2. **브라우저에서 눈으로 확인** — 유일하게 남은 검증 공백이다. dev 서버를 띄우고
   (`npm run dev` → http://localhost:5173) DevTools 콘솔에 아래를 붙여 넣으면
   Day 121 상태로 바로 간다. 레거시 키만 심으므로 마이그레이션도 같이 검증된다:

   ```js
   localStorage.clear();
   const start = new Date(); start.setDate(start.getDate() - 120);
   const f = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
   const startDate = f(start), checkins = {}, d = new Date(start);
   for (let i = 0; i < 121; i++) { checkins[f(d)] = true; d.setDate(d.getDate()+1); }
   localStorage.setItem('afc90_profile', JSON.stringify({name:'길동',height:175,weight:78,weeklyDrinks:14,startDate}));
   localStorage.setItem('afc90_checkins', JSON.stringify(checkins));
   localStorage.setItem('afc90_shown_milestones', JSON.stringify([3,7,21]));
   location.reload();
   ```

   `- 120`을 `- 220`으로 바꾸면 Day 221(200일 초과 회귀 테스트)이 된다.

   볼 것:
   - 대시보드 헤더 "AFC 200일 챌린지", 다음 목표 150일 (Day 221이면 "전 배지 달성!")
   - 캘린더 200칸이 `Day 1–50` 등 4섹션으로 끊겨 보이고, 3자리 숫자가 셀을 안 넘치는지
   - 마일스톤 배지 8종, 신체변화 "재생 완성기" 진행 중 / 진행바 "200일 여정" 60%
   - Day 221에서도 마지막 단계가 진행 중으로 남고 화면이 비지 않는지
   - SOS 모달 붉은 그라데이션 애니메이션이 안 깨졌는지 (`90deg` 오변경 방지)
   - DevTools Application 탭에서 `afc200_*` 키가 생기고 `afc90_*`가 보존됐는지

3. (선택) `/pdca analyze AFC200` 재실행 — `docs/03-analysis/AFC90.analysis.md`는 지난
   사이클의 **기록물**이라 일부러 안 건드렸다. 새 리포트를 만들려면 이걸 돌린다.

## PR 본문

`main ← feat/afc-200` PR에 붙여 넣을 초안. compare URL을 열면 제목은 자동으로
첫 커밋 제목이 들어가므로 본문만 채우면 된다.

<details>
<summary>펼치기</summary>

### 왜

90일(3개월)은 세포 재생이 완성되는 시점이지만, 금주 재발 위험이 가장 높은
**3~6개월 구간의 한복판**이다. 완주 축하 직후에 무너지는 구조였다.
200일은 그 구간을 완전히 통과하고, 습관 자동화(평균 66일·최대 254일,
Lally et al. 2010)에 대다수가 도달하는 지점이다.

### 무엇을

- **마일스톤 5종 → 8종.** 기존 날짜(3·7·21·50·90)는 유지하고 100·150·200 추가.
  "절반의 영웅"을 50일 → **100일**(진짜 절반)로, "AFC 완주자"를 90일 → **200일**로 이동.
  빈 자리는 "흔들리지 않는 마음"(50), "세포 재생 완성"(90)으로 채움
- **신체변화 4단계 → 6단계.** 91-150 재생 완성기, 151-200 새로운 나 추가.
  신체 부위에 혈액·면역(91일~), 정신력(151일~) 추가
- **캘린더 200칸**을 50일 단위 4섹션으로 분할, 3자리 일차에 맞춰 셀 폰트 조정
- 기획 문서 3종(`intro`·`problem`·`spec`)을 200일 기준으로 재작성.
  `problem.md`의 "왜 90일인가" → "왜 200일인가" 전면 교체 (출처 명시)

### 함께 고친 버그 3건

1. **localStorage 마이그레이션** — 키를 `afc90_*` → `afc200_*`로 바꾸며 1회성 이관 추가.
   **없으면 기존 사용자 체크인 기록이 전부 소실된다.** 레거시 키는 보존해 롤백 가능
2. **완주 후 "다음 목표" 고착** — 마지막 마일스톤이 계속 다음 목표로 뜨던 것을
   완주 문구로 분기
3. **해금 조건 불일치** — Calendar는 `dayNumber > m.day || completedDays >= m.day`,
   Dashboard는 `dayNumber >= m.day`로 서로 달랐다. `isMilestoneUnlocked()`로 통일

### 구조 개선

전환 전 `MILESTONES`는 **5개 파일에 복붙**돼 있었고 신체변화 단계는 3개 파일에 있었다.
`src/data/challenge.js`를 단일 출처로 도입하고 로컬 복사본을 전부 제거했다.
어디서도 import 되지 않던 죽은 파일 `src/data/content.js`(90일 문구 12곳)도 삭제.

### 리뷰어가 볼 곳

- `src/data/challenge.js` — 새 단일 상수 (`CHALLENGE_DAYS`, `MILESTONES`)
- `src/hooks/useAFC.js` — localStorage 마이그레이션
- `src/components/Calendar.jsx` — 200칸 섹션 분할

### 검증

빌드 통과. 5개 화면 × Day 1/90/120/200/221 서버 렌더 성공.
1–400일 전 구간 단계 매칭 누락 0건. 마이그레이션 3개 시나리오 통과.

**미완**: 브라우저 육안 확인. 절차는 `progress.md`의 "지금 해야 할 것"에 스니펫으로 있음.

</details>

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

### push가 무한 대기하는 진짜 이유 — VS Code askpass

`git push`가 **아무 출력 없이 무한 대기**한다. 에이전트가 돌려도, 사용자가 `!`로
돌려도 똑같다. 원인은 두 가지가 겹친 것이다:

1. **자격 증명이 아무 데도 없다** — 키체인에 `github.com` 항목 없음, SSH 키도 없음
   (`~/.ssh/*.pub` 없음)
2. **`GIT_ASKPASS`가 VS Code의 askpass 헬퍼를 가리킨다**
   (`/Applications/Visual Studio Code.app/.../git/dist/askpass.sh`). git이 자격 증명을
   물으려 하면 VS Code IPC 소켓으로 다이얼로그를 띄우는데, 이 세션에서는 아무도
   답하지 않아 영원히 멈춘다. `GIT_TERMINAL_PROMPT=0`은 askpass보다 우선순위가
   낮아서 소용없다.

**네트워크 문제가 아니다** — 확인했다:

| 확인 | 결과 |
|---|---|
| `.../info/refs?service=git-upload-pack` (읽기) | `200`, 0.31초 |
| `.../info/refs?service=git-receive-pack` (쓰기) | `401` 인증 필요, 0.31초 |
| 프록시 환경변수 / git http 설정 | 없음 |

진단용 재현 (즉시 실패한다):

```
GIT_ASKPASS=/usr/bin/false GIT_TERMINAL_PROMPT=0 \
  git -c credential.helper= push --dry-run origin feat/afc-200
# fatal: could not read Username for 'https://github.com': terminal prompts disabled
```

**대응**: 에이전트는 재시도하지 마라. 자격 증명 입력은 에이전트가 해서는 안 되는 일이다.
사용자가 아래 중 하나를 먼저 해야 한다.

- **VS Code 통합 터미널이나 Terminal.app에서 직접 push** — 거기서는 프롬프트가
  실제로 뜬다. 단 GitHub는 비밀번호를 안 받으므로 **Personal Access Token**이 필요하다
- **`brew install gh && gh auth login`** — 브라우저로 인증하고 자격 증명을 저장해 준다.
  이후 push가 조용히 통과하고, PR도 `gh pr create`로 만들 수 있다 (가장 깔끔)
- **SSH 키 등록** — `ssh-keygen` → GitHub에 공개키 등록 →
  `git remote set-url origin git@github.com:superpjh-stack/AFC90.git`

### `gh` CLI — 설치됨 (2026-08-19), 아직 미인증

`brew install gh`로 **gh 2.97.0 설치 완료**. 다만 `gh auth status`는
`You are not logged into any GitHub hosts`다. **인증은 에이전트가 하지 않는다** —
계정 로그인은 사용자 몫이다.

`origin`은 https://github.com/superpjh-stack/AFC90.git 이고, 저장소 이름은
전환 후에도 `AFC90` 그대로다(일부러 유지).

### Playwright는 캐시 버전이 안 맞는다

`~/Library/Caches/ms-playwright`에 chromium **1208**이 있는데 playwright 1.62는
**1234**를 찾아서 `Executable doesn't exist`로 죽는다. 쓰려면 `npx playwright install
chromium`으로 받거나 `chromium.launch({ channel: 'chrome' })`로 설치된 Google Chrome을
쓴다. **다만 사용자는 실제 Chrome을 띄우는 방식을 원하지 않았다** — 브라우저 확인은
사용자가 직접 하고, 나는 dev 서버만 띄우는 것으로 합의했다.

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
