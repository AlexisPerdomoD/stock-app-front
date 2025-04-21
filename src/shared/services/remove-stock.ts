import { API_URL, APi_SESSION_KEY } from '@shared/constants'
import type { Result } from '@shared/types'

export async function removeStockService(stockID: string): Promise<Result<null>> {
    try {
        const url = `${API_URL}/users/stocks/` + stockID

        const authToken = sessionStorage.getItem(APi_SESSION_KEY)

        if (!authToken) {
            return {
                ok: false,
                status: 401,
                message: 'Session expired, please login again'
            }
        }

        const res = await fetch(url, {
            method: 'delete',
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
                message: 'Failed to fetch stock'
            }
        }
        return {
            ok: true,
            data: null
        }
    } catch {
        return {
            ok: false,
            status: 500,
            message:
                'Something went wrong while fetching stock from the server, please try again later'
        }
    }
}
