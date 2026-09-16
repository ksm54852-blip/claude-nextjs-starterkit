import { z } from "zod"

/**
 * 문의 폼 스키마 (zod v4 문법).
 * 폼 컴포넌트는 이 스키마 하나만 보고 검증 규칙을 따른다.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 2자 이상 입력해주세요." })
    .max(20, { message: "이름은 20자를 넘을 수 없습니다." }),
  email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
  topic: z.enum(["bug", "feature", "etc"], {
    message: "문의 유형을 선택해주세요.",
  }),
  message: z
    .string()
    .min(10, { message: "문의 내용을 10자 이상 입력해주세요." })
    .max(500, { message: "문의 내용은 500자를 넘을 수 없습니다." }),
  agree: z.literal(true, {
    message: "개인정보 수집에 동의해야 제출할 수 있습니다.",
  }),
})

export type ContactInput = z.infer<typeof contactSchema>
