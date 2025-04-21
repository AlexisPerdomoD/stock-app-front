/**
{
    "id": 1065321461644394497,
    "company_id": 1065321461619261441,
    "ticker": "ai",
    "name": "",
    "price": 17,
    "tendency": 3,
    "registered": "2025-04-17T19:30:07.572604-05:00",
    "updated_at": "2025-04-17T19:30:07.572604-05:00",
    "company_name": "c3.ai",
    "market": {
        "id": 1065321371309768705,
        "name": "main source stock",
        "created_at": "2025-04-20T15:24:41.771312-05:00"
    }
}
 */
export type Stock = {
    id: number
    company_id: number
    ticker: string
    name: string
    price: number
    tendency: number
    registered: string
    updated_at: string
    company_name: string
    market: {
        id: number
        name: string
        created_at: string
    }
}
