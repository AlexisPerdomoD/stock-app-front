<script setup lang="ts">
import { ref } from 'vue'

import HeaderNavBar from './HeaderNavBar.vue'
import AppLogo from './icons/AppLogo.vue'

const props = defineProps<{
    view: 'home' | 'saved'
}>()
const emit = defineEmits<{
    (e: 'view-change', view: 'home' | 'saved'): void
}>()

const activeView = ref(props.view)
</script>
<template>
    <header class="bg-gray-800 shadow-md">
        <div class="container mx-auto flex items-center justify-between px-4 py-4">
            <div class="flex items-center">
                <AppLogo size="24" />
                <h1 class="ml-2 text-xl font-bold text-[var(--primary-txt)]">Stock App</h1>
            </div>
            <HeaderNavBar
                :defaultValue="activeView"
                :values="['home', 'saved']"
                @nav-change="emit('view-change', $event as 'home' | 'saved')"
            />
        </div>
    </header>
</template>
