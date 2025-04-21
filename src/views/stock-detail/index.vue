<script setup lang="ts">
import { capitalize, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

import BackIcon from '@/components/icons/BackIcon.vue'
import NotSavedIcon from '@/components/icons/NotSavedIcon.vue'
import SavedIcon from '@/components/icons/SavedIcon.vue'
import { getRecommendationsService } from '@/shared/services/get-recommendations'
import ErrorModal from '@components/ErrorModal.vue'
import { APi_SESSION_KEY } from '@shared/constants'
import { getStockService } from '@shared/services/get-stock'
import type { Err, Nullable, PaginationPayload } from '@shared/types'
import { Action, type Recommendation } from '@shared/types/recommendations'
import { type Stock, Tendency } from '@shared/types/stocks'

import { mapAction, mapTendency, toggleSavedCb } from './helpers'

const props = defineProps<{
    stockID: string
}>()

const router = useRouter()
const error = ref<Nullable<Err>>(null)
const stock = ref<Nullable<Stock>>(null)
const recommendations = ref<Nullable<PaginationPayload<Recommendation>>>(null)

const loading = ref<boolean>(true)

onBeforeMount(() => {
    if (!sessionStorage.getItem(APi_SESSION_KEY)) {
        error.value = { ok: false, status: 401, message: 'Session expired, please login again' }
        return
    }

    getStockService(props.stockID).then((result) => {
        if (!result.ok) {
            error.value = result
            return
        }
        stock.value = result.data
        getRecommendationsService(props.stockID, '').then((result) => {
            if (!result.ok) {
                error.value = result
                return
            }
            recommendations.value = result.data
            loading.value = false
        })
    })
})

const onCloseError = () => {
    if (error.value?.status === 401) {
        router.push('/login')
    }

    if (error.value?.status === 404) {
        router.push('/')
    }

    error.value = null
}
const goBack = () => {
    router.back()
}

const toggleSaved = () => {
    toggleSavedCb(stock, loading, error)
}
</script>

<template>
    <ErrorModal v-if="error" @close="onCloseError" :error="error.message" />
    <section class="min-h-[90vh] bg-gray-900 text-white">
        <header class="bg-gray-800 shadow-md">
            <div class="container mx-auto flex items-center px-4 py-4">
                <button @click="goBack" class="mr-4">
                    <BackIcon />
                </button>
                <div>
                    <h1 v-if="stock" class="text-xl font-bold">{{ stock.ticker.toUpperCase() }}</h1>
                    <p class="text-sm text-gray-400">
                        {{ stock?.company_name.split(' ').map(capitalize).join(' ') }}
                    </p>
                </div>
                <button
                    :disabled="loading"
                    @click="toggleSaved"
                    class="ml-auto rounded-full p-2 hover:bg-gray-700"
                    :class="stock?.is_saved ? 'text-emerald-500' : 'text-gray-400'"
                >
                    <SavedIcon v-if="stock?.is_saved" />
                    <NotSavedIcon v-else />
                </button>
            </div>
        </header>
        <main class="mx-auto px-4 py-6">
            <div class="mb-8" v-if="stock">
                <div class="flex items-baseline">
                    <span class="mr-3 text-3xl font-bold">${{ stock.price.toFixed(2) }}</span>
                    <span
                        :class="
                            stock.tendency === Tendency.Up
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : stock.tendency === Tendency.Down
                                  ? 'bg-red-500/20 text-red-500'
                                  : 'bg-gray-500/20 text-gray-500'
                        "
                        class="rounded px-2 py-1 text-sm font-medium"
                    >
                        {{ mapTendency(stock.tendency) }}
                    </span>
                </div>
                <p class="mt-1 text-sm text-gray-400">
                    Updated since {{ new Date(stock.updated_at).toLocaleString() }}
                </p>
            </div>

            <!-- Brokerage Recommendations -->
            <div class="mb-8 rounded-lg bg-gray-800 p-4" v-if="recommendations">
                <h2 class="mb-4 text-xl font-semibold">Brokerage Recommendations</h2>

                <div class="space-y-4">
                    <div
                        v-for="recommendation in recommendations.items"
                        :key="recommendation.id"
                        class="bg-gray-750 rounded-md border border-gray-700 p-3"
                    >
                        <div class="mb-2 flex items-start justify-between">
                            <div>
                                <h3 class="text-lg font-semibold">
                                    {{
                                        recommendation.brokerage_name
                                            .split(' ')
                                            .map(capitalize)
                                            .join(' ')
                                    }}
                                </h3>
                                <p class="text-md text-gray-400">
                                    {{ new Date(recommendation.created_at).toLocaleString() }}
                                </p>
                            </div>
                            <div
                                :class="
                                    recommendation.rating_from === Action.Buy
                                        ? 'text-emerald-500'
                                        : recommendation.rating_from === Action.Sell
                                          ? 'text-red-500'
                                          : 'text-gray-400'
                                "
                                class="text-sm font-medium"
                            >
                                {{ mapAction(recommendation.rating_from) }} →
                                {{ mapAction(recommendation.rating_to) }}
                            </div>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400">Target Price:</span>
                            <span
                                >${{ recommendation.target_from }} → ${{
                                    recommendation.target_to
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </section>
</template>
