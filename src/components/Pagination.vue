<script setup lang="ts">
defineProps<{
    totalRecords: number
    totalPages: number
    currentPage: number
    limit: number
}>()

const emits = defineEmits<{
    (e: 'update:page', page: number): void
}>()
</script>

<template>
    <!-- Pagination -->
    <div class="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="text-sm text-gray-400">
            Showing Page: <span class="font-medium text-white">{{ currentPage }}</span> of
            <span class="font-medium text-white">{{ totalPages }}</span> Page(s) by
            <span class="font-medium text-white">{{ totalRecords }}</span> Records total.
        </div>

        <div class="flex items-center space-x-1">
            <button
                @click="emits('update:page', currentPage - 1)"
                :disabled="currentPage === 1"
                class="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span class="sr-only">Previous Page</span>
            </button>

            <div class="flex items-center">
                <span class="flex h-9 w-9 items-center justify-center text-gray-500">
                    {{ currentPage }}
                </span>
            </div>

            <button
                @click="emits('update:page', currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
                <span class="sr-only">Next Page</span>
            </button>
        </div>
    </div>
</template>
