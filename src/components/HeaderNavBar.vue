<script setup lang="ts">
import { ref } from 'vue'

import UserIcon from './icons/UserIcon.vue'

const props = defineProps<{
    defaultValue: string
    values: string[]
}>()

const emits = defineEmits<{
    (e: 'nav-change', view: string): void
}>()

const current = ref<string>(props.defaultValue)
</script>

<template>
    <nav class="flex items-center space-x-4">
        <button
            v-for="value of values"
            @click="((current = value), emits('nav-change', value))"
            class="rounded-md px-3 py-1 text-sm"
            :class="
                current === value
                    ? 'bg-[var(--primary-border)] text-[var(--primary-txt)]'
                    : 'text-[var(--secondary-txt)] hover:bg-[var(--primary-border)]'
            "
        >
            {{ value }}
        </button>
        <button class="text-sm text-gray-400 hover:text-white">
            <UserIcon size="24" />
        </button>
    </nav>
</template>
