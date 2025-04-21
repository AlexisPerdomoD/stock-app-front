import type { Ref } from 'vue'
import type { RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'

import { OrderByStocks, type StockFilters, getStocksService } from '@shared/services/get-stocks'
import type { Err, Nullable } from '@shared/types'
import type { Stock } from '@shared/types/stocks'

export function getStocksCb(
    byUser: boolean,
    filters: Ref<StockFilters>,
    loading: Ref<boolean>,
    error: Ref<Nullable<Err>>,
    stocks: Ref<Stock[]>,
    totalRecords: Ref<number>,
    totalPages: Ref<number>
) {
    loading.value = true
    let searchParams = ''
    if (filters.value.search) {
        searchParams = `search=${filters.value.search}`
    }
    if (filters.value.orderby) {
        searchParams += `&orderby=${filters.value.orderby}`
    }

    if (filters.value.lower) {
        searchParams += `&lower=${filters.value.lower}`
    }

    if (filters.value.greater) {
        searchParams += `&greater=${filters.value.greater}`
    }

    if (filters.value.page) {
        searchParams += `&page=${filters.value.page}`
    }

    if (filters.value.limit) {
        searchParams += `&limit=${filters.value.limit}`
    }

    getStocksService(byUser, searchParams).then((result) => {
        loading.value = false
        if (!result.ok) {
            error.value = result
            return
        }
        stocks.value = result.data.items
        totalRecords.value = result.data.total_size
        totalPages.value = result.data.total_pages
    })
}

export class SearchQueryHandler {
    constructor(
        private readonly _router: Router,
        private readonly _route: RouteLocationNormalizedLoadedGeneric,
        private readonly _filters: Ref<StockFilters>
    ) {
        this.clearFilters = this.clearFilters.bind(this)
        this.setFilter = this.setFilter.bind(this)
        this.setByUser = this.setByUser.bind(this)
    }

    clearFilters() {
        this._filters.value = {
            byUser: this._filters.value.byUser,
            lower: 5000,
            greater: 0,
            orderby: OrderByStocks.ByNewest,
            search: null,
            page: 1,
            limit: 25
        }

        const query = { ...this._route.query }

        for (const [key, value] of Object.entries(this._filters.value)) {
            if (!value) {
                delete query[key]
            } else {
                query[key] = value.toString()
            }
        }

        this._router.push({ query })
    }

    setFilter(key: keyof StockFilters, value: StockFilters[keyof StockFilters]) {
        const query = { ...this._route.query }

        // reset page to 1 when changing filters
        if (key !== 'page') {
            this._filters.value.page = 1
            query['page'] = '1'
        }

        if (!value) {
            delete query[key]
        } else {
            query[key] = value.toString()
        }

        this._router.push({
            query
        })
    }

    setByUser(value: string) {
        this._router.push({
            query: { ...this._route.query, byuser: value === 'saved' ? 'true' : 'false' }
        })
    }
}
