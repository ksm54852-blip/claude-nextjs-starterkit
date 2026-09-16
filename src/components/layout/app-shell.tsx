import type { ReactNode } from "react"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

/**
 * 헤더 + 사이드바 + 본문 + 푸터로 구성된 앱 셸.
 * 모든 페이지가 이 레이아웃 안에서 렌더링된다.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-5xl px-4 py-8">{children}</div>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
