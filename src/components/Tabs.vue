<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    tabs: string[]
    default?: string
}>()

const emit = defineEmits<{
    (e: 'update:value', value: string): void
}>()

const internalTabValue = ref(props.default ?? props.tabs[0])

const tabs = computed(() => props.tabs)

watch(
    () => props.default,
    (val) => {
        if (val) internalTabValue.value = val
    }
)

const setActive = (tab: string) => {
    internalTabValue.value = tab
    emit('update:value', tab)
}

const isActive = (tab: string) => internalTabValue.value === tab
</script>

<template>
    <div class="w-full max-w-md">
        <div class="mb-4 flex">
            <button
                v-for="tab in tabs"
                :key="tab"
                @click="setActive(tab)"
                class="flex-1 py-2 text-center transition-colors"
                :class="
                    isActive(tab)
                        ? 'border-b-2 border-[var(--success-color)] text-[var(--primary-txt)]'
                        : 'text-[var(--secondary-txt)]'
                "
            >
                {{ tab }}
            </button>
        </div>
    </div>
</template>
