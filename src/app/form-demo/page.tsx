import type { Metadata } from "next"

import { ContactForm } from "@/components/forms/contact-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "폼 예제",
}

export default function FormDemoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">폼 예제</h1>
        <p className="text-muted-foreground">
          react-hook-form과 zod 스키마를 연결한 검증 폼입니다. 검증 규칙은{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            src/lib/validations/contact.ts
          </code>{" "}
          에 있습니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>문의하기</CardTitle>
          <CardDescription>
            빈 값이나 잘못된 형식으로 제출하면 에러 메시지가 표시됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  )
}
