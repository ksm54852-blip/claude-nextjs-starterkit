# Next.js Starter Kit

웹 개발을 바로 시작할 수 있도록 초기 설정을 모두 끝내 둔 스타터 킷입니다.
프로젝트 세팅에 드는 시간을 없애고 기능 개발부터 시작하세요.

## 기술 스택

| 구분       | 패키지                                | 버전           |
| ---------- | ------------------------------------- | -------------- |
| 프레임워크 | Next.js (App Router, Turbopack)       | 16.3.5         |
| 런타임     | React / React DOM                     | 19.2.8         |
| 언어       | TypeScript                            | 5.9.3          |
| 스타일     | Tailwind CSS (v4, CSS-first)          | 4.3.3          |
| UI         | shadcn/ui (Base UI 기반, Nova 프리셋) | CLI 4.21.0     |
| 아이콘     | lucide-react                          | 1.46.0         |
| 테마       | next-themes                           | 0.4.6          |
| 폼         | react-hook-form + zod                 | 7.88.0 / 4.6.5 |
| 데이터     | TanStack Query                        | 5.103.0        |
| 품질       | ESLint + Prettier                     | 9.x / 3.x      |

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000> 을 엽니다.

## 스크립트

| 명령                   | 설명                       |
| ---------------------- | -------------------------- |
| `npm run dev`          | 개발 서버 실행 (Turbopack) |
| `npm run build`        | 프로덕션 빌드              |
| `npm run start`        | 빌드 결과 실행             |
| `npm run lint`         | ESLint 검사                |
| `npm run lint:fix`     | ESLint 자동 수정           |
| `npm run format`       | Prettier 포맷 적용         |
| `npm run format:check` | 포맷 검사만 수행           |
| `npm run typecheck`    | 타입 검사 (`tsc --noEmit`) |

> Next.js 16부터 `next build`는 린트를 실행하지 않습니다. `npm run lint`를 따로 돌려주세요.

## 디렉토리 구조

```
src/
├── app/
│   ├── layout.tsx          루트 레이아웃 (폰트, Providers, AppShell)
│   ├── page.tsx            랜딩 페이지
│   ├── globals.css         Tailwind + 테마 토큰 (스타일 설정의 유일한 지점)
│   ├── showcase/           컴포넌트 쇼케이스
│   ├── form-demo/          폼 검증 예제
│   └── query-demo/         데이터 패칭 예제
├── components/
│   ├── ui/                 shadcn/ui 컴포넌트 (CLI가 생성)
│   ├── layout/             헤더 · 사이드바 · 모바일 내비 · 푸터 · 앱 셸
│   ├── theme/              테마 Provider와 토글 버튼
│   ├── forms/              폼 컴포넌트
│   ├── showcase/           쇼케이스 갤러리
│   ├── query-demo/         쿼리 예제 컴포넌트
│   └── providers.tsx       전역 Provider 단일 진입점
├── config/
│   ├── site.ts             사이트 이름 · 설명 · 링크
│   └── nav.ts              내비게이션 항목 (헤더 · 사이드바 · 모바일 공용)
├── lib/
│   ├── utils.ts            cn() 유틸
│   ├── get-query-client.ts QueryClient 생성 (SSR 안전)
│   ├── api.ts              데이터 패칭 함수 (교체 지점)
│   └── validations/        zod 스키마
└── types/                  공용 타입
```

## 자주 하는 작업

### 컴포넌트 추가하기

```bash
npx shadcn@latest add dialog
```

`src/components/ui/` 에 파일이 생성되며, 이후 자유롭게 수정할 수 있습니다.

### 페이지와 메뉴 추가하기

1. `src/app/<경로>/page.tsx` 를 만듭니다.
2. `src/config/nav.ts` 의 `navItems` 배열에 항목을 추가합니다.

헤더 · 사이드바 · 모바일 메뉴가 같은 배열을 공유하므로 한 곳만 고치면 됩니다.

### 테마 색상 바꾸기

**이 프로젝트에는 `tailwind.config` 파일이 없습니다.** Tailwind CSS v4는 CSS
파일에서 직접 설정하는 방식이기 때문입니다. 색상을 바꾸려면
`src/app/globals.css` 의 CSS 변수를 수정하세요.

```css
:root {
  --primary: oklch(0.205 0 0); /* 라이트 모드 */
}

.dark {
  --primary: oklch(0.922 0 0); /* 다크 모드 */
}
```

`@theme inline` 블록이 이 변수들을 `bg-primary` 같은 유틸리티 클래스로
연결해 주므로, 변수 값만 바꾸면 전체 UI에 반영됩니다.

### API 연결하기

`src/lib/api.ts` 의 함수를 자신의 API 호출로 교체하면 됩니다.
`src/components/query-demo/user-list.tsx` 가 이 함수를 사용하는 예시입니다.

### 폼 만들기

1. `src/lib/validations/` 에 zod 스키마를 정의합니다.
2. `useForm({ resolver: zodResolver(스키마) })` 로 폼을 만듭니다.
3. `Controller` 와 `Field` 계열 컴포넌트를 조합합니다.

`src/components/forms/contact-form.tsx` 를 참고하세요.

## 환경 변수

`.env.example` 을 `.env.local` 로 복사한 뒤 값을 채우세요.

```bash
cp .env.example .env.local
```
