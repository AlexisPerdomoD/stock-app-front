<script setup lang="ts">
import Footer from './components/Footer.vue'
</script>

<template>
    <section class="min-h-screen bg-[var(--secondary-background)]">
        <main class="min-h-[90vh]">
            <RouterView />
        </main>
        <Footer />
    </section>
</template>
