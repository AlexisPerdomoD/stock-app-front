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

export class ApiError extends Error {
    status: number
    name = 'ApiError'
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}
