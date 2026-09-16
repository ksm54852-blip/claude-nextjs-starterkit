import Link from "next/link"
import {
  ArrowRightIcon,
  ComponentIcon,
  MoonIcon,
  PaletteIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: ZapIcon,
    title: "Next.js App Router",
    description:
      "서버 컴포넌트와 Turbopack이 기본으로 켜진 최신 App Router 구조로 시작합니다.",
  },
  {
    icon: PaletteIcon,
    title: "Tailwind CSS v4",
    description:
      "설정 파일 없이 globals.css의 CSS 변수만으로 테마를 관리하는 CSS-first 방식입니다.",
  },
  {
    icon: ComponentIcon,
    title: "shadcn/ui",
    description:
      "복사해서 소유하는 컴포넌트. CLI로 필요한 것만 골라 추가하고 자유롭게 수정합니다.",
  },
  {
    icon: MoonIcon,
    title: "다크 모드",
    description:
      "next-themes로 라이트·다크·시스템 테마를 지원하며 새로고침 시 깜빡임이 없습니다.",
  },
  {
    icon: ShieldCheckIcon,
    title: "폼 검증",
    description:
      "react-hook-form과 zod 스키마를 연결해 타입 안전한 폼을 바로 만들 수 있습니다.",
  },
  {
    icon: ArrowRightIcon,
    title: "데이터 패칭",
    description:
      "TanStack Query가 캐싱·로딩·에러 상태를 대신 관리합니다. SSR 설정도 끝나 있습니다.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-start gap-6 pt-8">
        <Badge variant="secondary">웹 개발 스타터 킷</Badge>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            설정은 끝났습니다.
            <br />
            기능부터 만드세요.
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg text-pretty">
            {siteConfig.description}. 프로젝트 초기 세팅에 쓰는 시간을 없애고
            바로 제품을 만드는 데 집중할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* 링크로 렌더링하므로 native <button> 검사를 끈다 */}
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/showcase" />}
          >
            컴포넌트 둘러보기
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/form-demo" />}
          >
            폼 예제 보기
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">포함된 기능</h2>
          <p className="text-muted-foreground text-sm">
            아래 항목은 모두 설치와 연결이 끝난 상태입니다.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="text-muted-foreground size-5" />
                <CardTitle className="mt-2">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">빠른 시작</h2>
        <Card>
          <CardContent className="font-mono text-sm">
            <pre className="overflow-x-auto">
              <code>{`npm install
npm run dev

# 컴포넌트 추가
npx shadcn@latest add <컴포넌트명>`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
