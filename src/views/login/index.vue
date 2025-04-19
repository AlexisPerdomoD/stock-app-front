<script setup lang="ts">
import PrimaryBtn from '@components/PrimaryBtn.vue'
import Tabs from '@components/Tabs.vue'
import AppLogo from '@components/icons/AppLogo.vue'
</script>

<template>
    <section class="flex flex-col items-center justify-center p-4">
        <div class="mb-8 text-center">
            <div class="flex items-center justify-center">
                <AppLogo />
                <h1 class="ml-2 text-2xl font-bold text-white">Stock App</h1>
            </div>
            <p class="mt-2 text-gray-400">Track stocks with precision</p>
        </div>

        <Tabs :tabs="['Login', 'Register']" />

        <PrimaryBtn text="Login" type="submit" />
    </section>
</template>
