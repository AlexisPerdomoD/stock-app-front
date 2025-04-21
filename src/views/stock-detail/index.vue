<script setup lang="ts">
import { capitalize, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

import BackIcon from '@/components/icons/BackIcon.vue'
import NotSavedIcon from '@/components/icons/NotSavedIcon.vue'
import SavedIcon from '@/components/icons/SavedIcon.vue'
import ErrorModal from '@components/ErrorModal.vue'
import { APi_SESSION_KEY } from '@shared/constants'
import { getStockService } from '@shared/services/get-stock'
import type { Err, Nullable, PaginationPayload } from '@shared/types'
import type { Recommendation } from '@shared/types/recommendations'
import { type Stock, Tendency } from '@shared/types/stocks'

import { toggleSavedCb } from './helpers'

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
        loading.value = false
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
    <section class="min-h-screen bg-gray-900 text-white">
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
                        {{
                            stock.tendency === Tendency.Up
                                ? 'Up'
                                : stock.tendency === Tendency.Down
                                  ? 'Down'
                                  : 'Neutral'
                        }}
                    </span>
                </div>
                <p class="mt-1 text-sm text-gray-400">
                    Updated since {{ new Date(stock.updated_at).toLocaleString() }}
                </p>
            </div>
        </main>
    </section>
</template>
