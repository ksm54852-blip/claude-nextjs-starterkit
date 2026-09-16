import type { Metadata } from "next"

import { ComponentGallery } from "@/components/showcase/component-gallery"

export const metadata: Metadata = {
  title: "컴포넌트",
}

export default function ShowcasePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">컴포넌트</h1>
        <p className="text-muted-foreground">
          설치되어 있는 shadcn/ui 컴포넌트입니다. 헤더의 테마 버튼으로 라이트와
          다크 모드 양쪽을 확인해보세요.
        </p>
      </div>

      <ComponentGallery />
    </div>
  )
}
