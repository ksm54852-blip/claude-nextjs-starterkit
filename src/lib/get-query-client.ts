import { environmentManager, QueryClient } from "@tanstack/react-query"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR 환경에서 클라이언트가 곧바로 재요청하는 것을 막기 위해 0보다 큰 값을 둔다.
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

/**
 * 서버에서는 요청마다 새 QueryClient를, 브라우저에서는 하나를 재사용한다.
 * (TanStack Query 공식 Advanced SSR 가이드 패턴)
 */
export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}
