<script lang="ts" setup>
const props = defineProps<{
    name: string
    submitcb: () => Promise<void>
}>()

const emit = defineEmits<{
    (e: 'isSubmitting', value: boolean): void
}>()

const handleSubmit = () => {
    emit('isSubmitting', true)
    props.submitcb().finally(() => emit('isSubmitting', false))
}
</script>

<template>
    <form class="flex h-full min-h-full flex-auto" @submit.prevent="handleSubmit" :id="name">
        <slot />
    </form>
</template>
