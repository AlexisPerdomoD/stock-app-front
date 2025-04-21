<script setup lang="ts">
import { capitalize } from 'vue'

import type { Stock } from '@shared/types/stocks'

defineProps<{
    stocks: Stock[]
    onStockClick: (stock: Stock) => void
}>()
</script>
<template>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="stock in stocks"
            :key="stock.ticker"
            @click="onStockClick(stock)"
            class="hover:bg-gray-750 cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-4 transition-colors"
        >
            <div class="mb-2 flex items-start justify-between">
                <div>
                    <h3 class="font-bold text-[var(--primary-txt)]">
                        {{ stock.ticker.toUpperCase() }}
                    </h3>
                    <p class="text-sm text-gray-400">
                        {{ stock.company_name.split(' ').map(capitalize).join(' ') }}
                    </p>
                </div>
                <div
                    :class="
                        stock.tendency == 1
                            ? 'text-[var(--success-color)]'
                            : stock.tendency === 3
                              ? 'text-[var(--error-color)]'
                              : 'text-[var(--muted-txt)]'
                    "
                    class="text-right"
                >
                    <div class="text-lg font-semibold">${{ stock.price.toFixed(2) }}</div>
                    <div class="flex items-center text-xs">
                        <span v-if="stock.tendency == 1">Up valuation</span>
                        <span v-else-if="stock.tendency == 3">Down valuation</span>
                        <span v-else>No change</span>
                        <svg
                            v-if="stock.tendency === 1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="ml-1"
                        >
                            <path d="m18 15-6-6-6 6"></path>
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="ml-1"
                        >
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="h-12 overflow-hidden rounded bg-gray-900">
                <!-- Simple chart placeholder mock-->
                <div class="relative h-full w-full">
                    <div
                        v-for="(point, index) in 10"
                        :key="index"
                        class="absolute bottom-0 w-[8%]"
                        :style="{
                            height: `${30 + Math.random() * 70}%`,
                            left: `${index * 10}%`,
                            backgroundColor:
                                stock.tendency === 1
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : 'rgba(239, 68, 68, 0.2)'
                        }"
                    ></div>
                </div>
            </div>
            <!-- Date Range -->
            <p class="mt-2 text-xs text-[var(--muted-txt)]">
                Updated at {{ new Date(stock.updated_at).toLocaleString() }}
            </p>
        </div>
    </div>
</template>
