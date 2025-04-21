<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Pagination from '@/components/Pagination.vue'
import { OrderByStocks, type StockFilters } from '@/shared/services/get-stocks'
import ErrorModal from '@components/ErrorModal.vue'
import Header from '@components/Header.vue'
import PrimaryBtn from '@components/PrimaryBtn.vue'
import StockList from '@components/StockList.vue'
import SearchIcon from '@components/icons/SearchIcon.vue'
import VoidIcon from '@components/icons/VoidIcon.vue'
import type { Err, Nullable } from '@shared/types'
import type { Stock } from '@shared/types/stocks'
import { useDebounceFn } from '@vueuse/core'

import { SearchQueryHandler, getStocksCb } from './helpers'

const props = defineProps<{
    search?: string
    orderby?: OrderByStocks
    lower?: string
    greater?: string
    page?: string
    limit?: string
    byUser: boolean
}>()

const filters = ref<StockFilters>({
    byUser: props.byUser,
    lower: props.lower ? parseInt(props.lower) : 5000,
    greater: props.greater ? parseInt(props.greater) : 0,
    orderby: props.orderby ?? OrderByStocks.ByNewest,
    search: props.search ?? null,
    page: props.page ? parseInt(props.page) : 1,
    limit: 25
})

const router = useRouter()
const route = useRoute()
const stocks = ref<Stock[]>([])
const totalRecords = ref<number>(0)
const totalPages = ref<number>(0)
const error = ref<Nullable<Err>>(null)
const loading = ref(true)

const searchQueryHandler = new SearchQueryHandler(router, route, filters)

const onCloseError = () => {
    if (error.value?.status === 401) {
        router.push('/login')
    }
    error.value = null
}

watch(
    () => route.query,
    useDebounceFn(
        () => getStocksCb(props.byUser, filters, loading, error, stocks, totalRecords, totalPages),
        500
    ),
    { immediate: true }
)

const onStockClick = (stock: Stock) => {
    console.log('Clicked on stock:', stock)
}
</script>

<template>
    <ErrorModal v-if="error" :error="error.message" @close="onCloseError" />
    <Header view="home" @view-change="searchQueryHandler.setByUser" />
    <main class="container mx-auto px-4 py-6">
        <div class="mb-6">
            <div class="relative mb-4">
                <input
                    type="text"
                    :disabled="loading"
                    v-model="filters.search"
                    @input="searchQueryHandler.setFilter('search', filters.search)"
                    placeholder="Search stocks by company name..."
                    class="w-full rounded-md border border-[var(--primary-border)] bg-[var(--secondary-background)] px-4 py-2 pl-10 text-[var(--primary-txt)] focus:ring-2 focus:ring-[var(--ring-primary)] focus:outline-none"
                />
                <SearchIcon />
            </div>

            <div class="flex flex-wrap gap-4">
                <div class="min-w-[120px] flex-1">
                    <label class="mb-1 block text-xs text-gray-400">Min Price ($)</label>
                    <input
                        type="number"
                        :disabled="loading"
                        v-model="filters.greater"
                        @input="searchQueryHandler.setFilter('greater', filters.greater)"
                        min="0"
                        class="w-full rounded-md border border-[var(--primary-border)] bg-[var(--secondary-background)] px-3 py-1.5 text-[var(--primary-txt)] focus:ring-1 focus:ring-[var(--ring-primary)] focus:outline-none"
                    />
                </div>
                <div class="min-w-[120px] flex-1">
                    <label class="mb-1 block text-xs text-gray-400">Max Price ($)</label>
                    <input
                        type="number"
                        :disabled="loading"
                        v-model="filters.lower"
                        @input="searchQueryHandler.setFilter('lower', filters.lower)"
                        min="0"
                        class="w-full rounded-md border border-[var(--primary-border)] bg-[var(--secondary-background)] px-3 py-1.5 text-[var(--primary-txt)] focus:ring-1 focus:ring-[var(--ring-primary)] focus:outline-none"
                    />
                </div>
                <div class="min-w-[120px] flex-1">
                    <label class="mb-1 block text-xs text-gray-400">Order By</label>
                    <select
                        :disabled="loading"
                        v-model="filters.orderby"
                        @change="searchQueryHandler.setFilter('orderby', filters.orderby)"
                        class="w-full rounded-md border border-[var(--primary-border)] bg-[var(--secondary-background)] px-3 py-2 text-[var(--primary-txt)] focus:ring-1 focus:ring-[var(--ring-primary)] focus:outline-none"
                    >
                        <option :value="OrderByStocks.ByNewest">Newest updates</option>
                        <option :value="OrderByStocks.ByOldest">Oldest updated</option>
                        <option :value="OrderByStocks.TendencyAsc">Must valuation</option>
                        <option :value="OrderByStocks.TendencyDesc">Must valuation</option>
                        <option :value="OrderByStocks.PriceAsc">Cheapest</option>
                        <option :value="OrderByStocks.PriceDesc">Most expensive</option>
                    </select>
                </div>
                <div class="flex items-end">
                    <PrimaryBtn
                        @click="searchQueryHandler.clearFilters"
                        text="Reset"
                        type="button"
                    />
                </div>
            </div>
        </div>

        <h2 class="mb-4 text-xl font-semibold text-[var(--primary-txt)]">
            {{ !byUser ? 'Top Stocks' : 'Your Saved Stocks' }}
        </h2>

        <StockList v-if="stocks.length > 0" :stocks="stocks" v-on:stock-click="onStockClick" />
        <div v-else="stocks.length === 0" class="py-12 text-center">
            <VoidIcon />
            <h3 class="text-lg font-medium text-gray-400">No stocks found</h3>
            <p class="mt-1 text-gray-500">Try adjusting your search or filters</p>
        </div>

        <!-- Pagination selector -->
        <Pagination
            :total-records="totalRecords"
            :total-pages="totalPages"
            :current-page="filters.page"
            :limit="25"
            @update:page="(searchQueryHandler.setFilter('page', $event), (filters.page = $event))"
        />
    </main>
</template>
