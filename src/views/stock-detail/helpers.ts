import type { Ref } from 'vue'

import { getStockService } from '@/shared/services/get-stock'
import { removeStockService } from '@/shared/services/remove-stock'
import { saveStockService } from '@/shared/services/save-stock'
import type { Err, Nullable } from '@shared/types'
import type { Stock } from '@shared/types/stocks'

export async function toggleSavedCb(
    stock: Ref<Nullable<Stock>>,
    loading: Ref<boolean>,
    error: Ref<Nullable<Err>>
) {
    if (stock.value === null) return
    loading.value = true

    const res = stock.value.is_saved
        ? await removeStockService(stock.value.id)
        : await saveStockService(stock.value.id)

    if (!res.ok) {
        error.value = res
        loading.value = false
        return
    }

    const update = await getStockService(stock.value.id)
    if (!update.ok) {
        error.value = update
        loading.value = false
        return
    }

    stock.value = update.data
    loading.value = false
}
