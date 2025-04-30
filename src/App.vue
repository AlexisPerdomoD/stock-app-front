<script setup lang="ts">
import Footer from './components/Footer.vue'
</script>

<template>
    <section class="min-h-screen bg-[var(--primary-background)]">
        <section class="min-h-[90vh]">
            <RouterView />
        </section>
        <Footer />
    </section>
</template>
