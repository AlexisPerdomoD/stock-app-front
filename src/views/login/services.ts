import { API_URL, APi_SESSION_KEY } from '@/constants'
import { ApiError, type Result } from '@/types'

export type User = {
    username: string
    password: string
}

export enum Strategy {
    Register,
    Login
}

export async function loginService(strategy: Strategy, user: User): Promise<Result<null>> {
    try {
        const url = strategy === Strategy.Register ? `${API_URL}/users` : `${API_URL}/users/login`
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.username, password: user.password })
        })

        if (!res.ok) {
            const message =
                (await res.json())?.message ?? 'Oops, something went wrong, please try again later'
            return {
                ok: false,
                status: res.status,
                message
            }
        }

        const payload = await res.json()
        if (typeof payload?.session !== 'string') {
            throw new ApiError('Invalid backend response', 500)
        }

        sessionStorage.setItem(APi_SESSION_KEY, payload.session)
        return {
            ok: true,
            data: null
        }
    } catch (e) {
        if (e instanceof ApiError) {
            return {
                ok: false,
                status: e.status,
                message: e.message
            }
        }

        return {
            ok: false,
            status: 500,
            message: 'Oops, something went wrong, please try again later'
        }
    }
}

export const validatePassowrd = (password: string) => password.length > 8

export const validateUsername = (username: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)
