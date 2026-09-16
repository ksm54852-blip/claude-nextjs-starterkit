"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"

import { contactSchema, type ContactInput } from "@/lib/validations/contact"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const topicLabels: Record<string, string> = {
  bug: "버그 제보",
  feature: "기능 제안",
  etc: "기타",
}

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  // 실제 프로젝트에서는 이 부분을 Server Action이나 API 호출로 교체한다.
  async function onSubmit(values: ContactInput) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success("문의가 접수되었습니다.", {
      description: `${values.name}님의 문의를 확인 후 답변드리겠습니다.`,
    })
    form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">이름</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="홍길동"
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">이메일</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                답변을 받을 이메일 주소를 입력해주세요.
              </FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="topic"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>문의 유형</FieldLabel>
              <Select
                value={field.value ?? null}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  {/* Base UI의 Select.Value는 children 함수로 표시 문자열을 만든다 */}
                  <SelectValue>
                    {(value: string | null) =>
                      value ? topicLabels[value] : "유형을 선택하세요"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(topicLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="message">문의 내용</FieldLabel>
              <Textarea
                {...field}
                id="message"
                rows={5}
                placeholder="어떤 점이 궁금하신가요?"
                aria-invalid={fieldState.invalid}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="agree"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="agree"
                checked={field.value ?? false}
                onCheckedChange={(checked) => field.onChange(checked)}
                aria-invalid={fieldState.invalid}
              />
              <div className="flex flex-col gap-1">
                <FieldLabel htmlFor="agree" className="font-normal">
                  개인정보 수집 및 이용에 동의합니다.
                </FieldLabel>
                <FieldError errors={[fieldState.error]} />
              </div>
            </Field>
          )}
        />

        <div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2Icon className="size-4 animate-spin" />
            )}
            문의 보내기
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
