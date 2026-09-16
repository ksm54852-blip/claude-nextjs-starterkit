<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 프로젝트 규칙

## 스타일

- 들여쓰기는 2칸, 세미콜론 없음 (Prettier 설정을 따른다).
- 주석과 문서는 한국어로 작성한다. 변수명·함수명은 영어를 쓴다.
- 클래스 병합은 항상 `@/lib/utils` 의 `cn()` 을 재사용한다. 새로 만들지 않는다.

## Tailwind CSS v4

- **`tailwind.config.*` 파일을 만들지 않는다.** 이 프로젝트는 CSS-first 방식이다.
- 테마 토큰은 `src/app/globals.css` 의 `:root` / `.dark` 블록에서만 수정한다.
- 색상은 하드코딩하지 말고 `bg-background`, `text-muted-foreground` 같은
  의미 기반 유틸리티를 사용한다.

## 컴포넌트

- 새 UI 컴포넌트는 직접 작성하기 전에 `npx shadcn@latest add <이름>` 을 먼저 시도한다.
- `src/components/ui/` 는 CLI 생성물이다. 필요할 때만 수정한다.
- 이 프로젝트의 shadcn/ui는 **Base UI** 기반이다. Radix 예제를 그대로 붙여넣지 말고
  `render` prop 방식(`asChild` 아님)을 사용한다.
- 아이콘은 `lucide-react` 를 쓴다. v1에서 브랜드 아이콘(GitHub 등)은 제거되었다.

## 구조

- 내비게이션 항목은 `src/config/nav.ts` 한 곳에서만 관리한다.
- 전역 Provider는 `src/components/providers.tsx` 에만 추가한다.
- 서버 컴포넌트를 기본으로 하고, 상태나 이벤트가 필요할 때만 `"use client"` 를 붙인다.

## 검증

작업을 마치면 다음을 모두 통과시킨다.

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```
