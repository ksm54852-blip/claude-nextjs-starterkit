/**
 * 사이트 전역 메타데이터.
 * 새 프로젝트를 시작할 때 이 파일부터 수정하세요.
 */
export const siteConfig = {
  name: "Next Starter Kit",
  description:
    "Next.js App Router · TypeScript · Tailwind CSS v4 · shadcn/ui 기반 스타터 킷",
  url: "http://localhost:3000",
  links: {
    github: "https://github.com",
  },
} as const

export type SiteConfig = typeof siteConfig
