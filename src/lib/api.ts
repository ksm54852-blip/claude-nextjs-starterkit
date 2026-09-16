import type { User } from "@/types"

/**
 * 데모용 데이터 패칭 함수.
 * 실제 프로젝트에서는 이 파일의 내용을 자신의 API 호출로 교체하면 된다.
 */
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")

  if (!res.ok) {
    throw new Error(`사용자 목록을 불러오지 못했습니다. (${res.status})`)
  }

  return res.json()
}
