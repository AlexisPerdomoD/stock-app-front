<script setup lang="ts">
import Footer from './components/Footer.vue'
</script>

<template>
    <section class="min-h-screen bg-[var(--secondary-background)]">
        <header>
            <div class="flex items-center justify-between">
                <nav class="y-between items-center gap-x-10 rounded-md border-2 bg-[var(--secondary-background)] p-2">
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/login">Login</RouterLink>
                </nav>
            </div>
        </header>
        <main>
            <RouterView />
        </main>
        <Footer />
    </section>
</template>
