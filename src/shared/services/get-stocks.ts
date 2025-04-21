import { API_URL, APi_SESSION_KEY } from '@shared/constants'
import type { Nullable, PaginationPayload, Result } from '@shared/types'
import type { Stock } from '@shared/types/stocks'

export enum OrderByStocks {
    ByNewest = '',
    ByOldest = 'date',
    TendencyAsc = 'tendency-asc',
    TendencyDesc = 'tendency-desc',
    PriceAsc = 'price-asc',
    PriceDesc = 'price-desc'
}

export type StockFilters = {
    byUser: boolean
    lower: number
    greater: number
    orderby: OrderByStocks
    search: Nullable<string>
    page: number
    limit: 25
}

export async function getStocksService(
    byUser: boolean,
    query: string
): Promise<Result<PaginationPayload<Stock>>> {
    try {
        const url = byUser ? `${API_URL}/users/stocks` : `${API_URL}/stocks` + `?${query}`

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
                message: 'Failed to fetch stocks'
            }
        }
        const data = await res.json()
        return {
            ok: true,
            data: data as PaginationPayload<Stock>
        }
    } catch {
        return {
            ok: false,
            status: 500,
            message:
                'Something went wrong while fetching stocks from the server, please try again later'
        }
    }
}
