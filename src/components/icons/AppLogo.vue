<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size ?? '40'"
        :height="size ?? '40'"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-[var(--success-color)]"
    >
        <path d="M3 3v18h18"></path>
        <path d="m19 9-5 5-4-4-3 3"></path>
    </svg>
</template>
