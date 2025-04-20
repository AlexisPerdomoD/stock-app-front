<script setup lang="ts">
defineProps<{
    error: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const closeError = () => {
    emit('close')
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 px-4">
        <div
            class="animate-fade-in w-full max-w-md overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-lg"
        >
            <div class="p-5">
                <div class="flex items-start">
                    <div class="mr-3 flex-shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-red-500"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>

                    <div class="flex-1">
                        <h3 class="mb-1 text-lg font-medium text-white">Error</h3>
                        <p class="text-sm text-gray-400">{{ error }}</p>
                    </div>

                    <button
                        @click="closeError"
                        class="ml-4 text-gray-400 transition-colors hover:text-white"
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
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="bg-gray-750 flex justify-end px-5 py-3">
                <button
                    @click="closeError"
                    class="rounded-md bg-gray-700 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                >
                    Dismiss
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
