import { API_URL, APi_SESSION_KEY } from '@shared/constants'
import type { PaginationPayload, Result } from '@shared/types'
import type { Recommendation } from '@shared/types/recommendations'

export async function getRecommendationsService(
    stockID: string,
    query: string
): Promise<Result<PaginationPayload<Recommendation>>> {
    try {
        const url = `${API_URL}/recommendations/` + stockID + `?${query}`

        const authToken = sessionStorage.getItem(APi_SESSION_KEY)
        if (!authToken) {
            return {
                ok: false,
                status: 401,
                message: 'Session expired, please login again'
            }
        }

        const res = await fetch(url, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            if (res.status === 401) {
                sessionStorage.removeItem(APi_SESSION_KEY)
                return {
                    ok: false,
                    status: 401,
                    message: 'Session expired, please login again'
                }
            }
            return {
                ok: false,
                status: res.status,
                message: 'Failed to fetch stocks recommendations'
            }
        }
        const data = await res.json()
        return {
            ok: true,
            data: data as PaginationPayload<Recommendation>
        }
    } catch {
        return {
            ok: false,
            status: 500,
            message:
                'Something went wrong while fetching stocks  recommendations from the server, please try again later'
        }
    }
}
