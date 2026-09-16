import {
  HomeIcon,
  LayoutGridIcon,
  SquarePenIcon,
  DatabaseIcon,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

/**
 * 헤더·사이드바·모바일 내비게이션이 모두 이 배열을 공유한다.
 * 페이지를 추가하면 여기에만 항목을 넣으면 된다.
 */
export const navItems: NavItem[] = [
  {
    title: "홈",
    href: "/",
    icon: HomeIcon,
    description: "랜딩 페이지",
  },
  {
    title: "컴포넌트",
    href: "/showcase",
    icon: LayoutGridIcon,
    description: "shadcn/ui 컴포넌트 쇼케이스",
  },
  {
    title: "폼",
    href: "/form-demo",
    icon: SquarePenIcon,
    description: "react-hook-form + zod 검증 예제",
  },
  {
    title: "데이터",
    href: "/query-demo",
    icon: DatabaseIcon,
    description: "TanStack Query 데이터 패칭 예제",
  },
]
