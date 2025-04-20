<script lang="ts" setup>
import { ref } from 'vue'

type FormInputTextProps = {
    validatecb: (value: string) => boolean
    name: string
    placeholder: string
    type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
    default?: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
}

type FormInputTextEmits = {
    (e: 'update:valid', value: boolean): void
    (e: 'update:value', value: string): void
}

const props = defineProps<FormInputTextProps>()
const emits = defineEmits<FormInputTextEmits>()

const value = ref(props.default ?? '')
const isValid = ref(props.validatecb(value.value))
const isBlurred = ref(true)

const onFocus = () => {
    showError.value = false
    isBlurred.value = false
}

const onBlur = () => {
    isBlurred.value = true
    showError.value = !isValid.value && !props.disabled && !props.readonly && value.value !== ''
}

const onInput = (e: Event) => {
    value.value = (e.target as HTMLInputElement).value
    isValid.value = props.validatecb(value.value)

    emits('update:valid', isValid.value)
    emits('update:value', value.value)
}

const showError = ref(false)
</script>

<template>
    <input
        class="w-full rounded-md border border-[var(--secondary-border)] bg-[var(--input-background)] px-3 py-2 text-[var(primary-txt)] focus:ring-2 focus:ring-[var(--ring-primary)] focus:outline-none"
        :class="showError ? 'border-[var(--error-color)] ring-2 ring-[var(--error-color)]' : ''"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        :disabled="disabled"
        :readonly="readonly"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        :required="required"
    />
</template>
