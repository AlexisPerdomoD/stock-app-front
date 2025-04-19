<script lang="ts" setup>

defineProps<{
  text: string,
  type: 'button' | 'submit' | 'reset',
  customClass?: string,
  disabled?: boolean,
  form?: string,
}>()

defineEmits<{
  (e: 'click', event: Event): void
  (e: 'hover', event: Event): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'change', event: Event): void
}>()

</script>


<template>
  <button :type="type" @click="$emit('click', $event)" @hover="$emit('hover', $event)" @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)" @change="$emit('change', $event)" :disabled="disabled" :form="form"
    class="w-full py-2 px-4 bg-[var(--primary-btn)] hover:bg-[var(--primary-btn-hover)] text-[var(--primary-txt)] font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring-primary)] focus:ring-offset-2 focus:ring-offset-[var(--ring-primary-offset)]">
    {{ text }}
  </button>


</template>
