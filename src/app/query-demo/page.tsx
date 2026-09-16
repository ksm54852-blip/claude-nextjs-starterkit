import type { Metadata } from "next"

import { UserList } from "@/components/query-demo/user-list"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "데이터 예제",
}

export default function QueryDemoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">데이터 예제</h1>
        <p className="text-muted-foreground">
          TanStack Query로 목록을 불러옵니다. 패칭 함수는{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            src/lib/api.ts
          </code>{" "}
          에 있으니 이 파일만 바꾸면 자신의 API로 교체됩니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>
            로딩 중에는 스켈레톤, 실패 시에는 경고가 표시됩니다. 60초 동안은
            캐시된 데이터를 사용합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserList />
        </CardContent>
      </Card>
    </div>
  )
}
