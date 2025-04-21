export enum Action {
    Buy = 1,
    Hold = 2,
    Neutral = 3,
    Sell = 4
}

/*
Recommendation
Represents a recommendation made by a brokerage team.
*/
export type Recommendation = {
    id: string
    stock_id: string
    brokerage_id: string
    rating_to: Action
    rating_from: Action
    target_to: number
    target_from: number
    created_at: string
    brokerage_name: string
}
