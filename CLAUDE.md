# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

프로젝트 규칙(스타일·Tailwind·컴포넌트·구조)은 위 `AGENTS.md` 에 있다. 이 문서는
규칙을 반복하지 않고 **명령어**와 **아키텍처**만 다룬다.

## 명령어

```bash
npm run dev          # 개발 서버 (Turbopack, http://localhost:3000)
npm run build        # 프로덕션 빌드
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint (flat config)
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 적용
npm run format:check # 포맷 검사만
```

- **Next.js 16의 `next build` 는 린트를 실행하지 않는다.** `npm run lint` 를 따로 돌린다.
- `npm run typecheck` 는 `.next/types/` 의 생성 타입에 의존한다. 클론 직후 타입 에러가
  나면 `npm run dev` 나 `npm run build` 를 한 번 돌려 타입을 생성한다.
- **테스트 러너가 설정되어 있지 않다.** 테스트가 필요하면 먼저 도입 여부를 확인한다.

## 아키텍처

### 스택 버전이 중요하다

Next.js 16.3.5 / React 19.2.8 / Tailwind v4 / zod v4 / shadcn CLI 4.x 조합이다.
각 라이브러리의 이전 메이저 문법이 그대로 통하지 않으므로, 기억에 의존하지 말고
`node_modules/next/dist/docs/` 와 실제 소스를 확인한다.

### 렌더링 계층

```
app/layout.tsx  →  Providers  →  AppShell  →  각 page.tsx
                   (client)      (server)
```

- `layout.tsx` 는 폰트 변수(`--font-sans`, `--font-geist-mono`)를 `<html>` 에 주입한다.
  이 변수명은 `globals.css` 의 `@theme inline` 이 참조하므로 바꾸면 양쪽을 함께 고친다.
- `providers.tsx` 의 중첩 순서는 `ThemeProvider → QueryClientProvider → TooltipProvider`.
  Toaster(sonner)는 Providers 바깥, AppShell 옆에 있다.
- `AppShell` 은 서버 컴포넌트지만 자식인 `SiteHeader` · `AppSidebar` · `MobileNav` 는
  `usePathname()` 때문에 클라이언트 컴포넌트다.

### 라우트 타입은 생성물이다

페이지·레이아웃의 props 타입은 전역으로 생성된다. 직접 정의하지 말고 사용한다.

```tsx
export default function RootLayout({ children }: LayoutProps<"/">) {}
export default function Page(props: PageProps<"/blog/[slug]">) {}
```

정의는 `.next/types/routes.d.ts` 에 있다.

### shadcn/ui는 Base UI 기반이다 (Radix 아님)

`components.json` 의 스타일 프리셋은 `base-nova` 이고 프리미티브는 `@base-ui/react` 다.
Radix 예제를 붙여넣으면 깨진다.

- 다른 엘리먼트로 렌더링할 때는 `asChild` 가 아니라 `render` prop 을 쓴다.
- **Base UI `Button` 은 `nativeButton` 기본값이 true다.** `render={<Link />}` 나
  `render={<a />}` 처럼 버튼이 아닌 것으로 렌더링하면 `nativeButton={false}` 를 함께
  넘겨야 경고가 사라진다 (커밋 `66fec6e` 참고).
- `Select.Value` 는 children 으로 **함수**를 받아 표시 문자열을 만든다.
  `contact-form.tsx` 의 `topic` 필드가 실제 예시다.

### 스타일 파이프라인

`src/app/globals.css` 하나가 스타일 설정의 전부다. `tailwind.config.*` 는 없다
(`components.json` 의 `tailwind.config` 도 빈 문자열).

```
@import "tailwindcss" / "tw-animate-css" / "shadcn/tailwind.css"
  ↓
:root · .dark 의 CSS 변수(--primary 등)   ← 색상은 여기만 고친다
  ↓
@theme inline 이 --color-primary 로 매핑  ← 유틸리티 bg-primary 생성
```

다크 모드는 `@custom-variant dark (&:is(.dark *))` + next-themes 의 class 전략이고,
그래서 `<html>` 에 `suppressHydrationWarning` 이 붙어 있다.

`cn()` 의 실체는 shadcn 의 `cn` npm 패키지(clsx + tailwind-merge 대체)다.
`@/lib/utils` 는 이를 재수출할 뿐이다. `src/components/ui/` 의 CLI 생성물은
`from "cn"` 으로 직접 import 하지만, 직접 작성하는 코드는 `@/lib/utils` 를 쓴다.

Prettier에 `prettier-plugin-tailwindcss` 가 물려 있어 **클래스 정렬 순서까지 검사**한다.
`format:check` 실패의 흔한 원인이다.

### 데이터 계층

`getQueryClient()` 는 `environmentManager.isServer()` 로 환경을 구분해 서버에서는
요청마다 새 QueryClient를, 브라우저에서는 싱글턴을 반환한다 (TanStack Query Advanced
SSR 패턴). 기본값은 `staleTime: 60초`, `retry: 1`.

### 단일 소스 지점

새 프로젝트로 바꿀 때 손대는 파일들:

| 파일                  | 역할                                               |
| --------------------- | -------------------------------------------------- |
| `src/config/site.ts`  | 사이트 이름·설명·링크 (메타데이터가 여기서 파생됨) |
| `src/config/nav.ts`   | 헤더·사이드바·모바일 내비가 공유하는 유일한 배열   |
| `src/lib/api.ts`      | 데모 패칭 함수. 실제 API로 교체하는 지점           |
| `src/app/globals.css` | 테마 토큰                                          |

내비 활성 상태 판정(`href === "/" ? pathname === "/" : pathname.startsWith(href)`)은
header · sidebar · mobile-nav 세 곳에 복제되어 있다. 규칙을 바꾸면 세 곳 모두 고친다.

### 폼

zod v4 문법이다. `z.string().email()` 이 아니라 **`z.email()`** 처럼 최상위 함수를 쓴다.
스키마는 `src/lib/validations/` 에 두고, 폼은 `Controller` + `Field` 계열 컴포넌트를
조합한다. `contact-form.tsx` 가 레퍼런스다.

## AGENTS.md 주의

`AGENTS.md` 상단 `<!-- BEGIN:nextjs-agent-rules -->` 블록은 `next dev` 가 자동으로
다시 써넣는다. 지워도 되살아나므로, 변경분이 생기면 작업과 함께 커밋해 트리를 깨끗이 둔다.
