export type Nullable<T> = T | null

export type Err = {
    ok: false
    status: number
    message: string
    details?: Record<string, string>
}

export type Result<T> =
    | {
          ok: true
          data: T
      }
    | Err

export type PaginationPayload<T> = {
    items: T[]
    page: number
    page_size: number
    total_pages: number
    total_size: number
}

export class ApiError extends Error {
    status: number
    name = 'ApiError'
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}
