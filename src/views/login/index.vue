<script setup lang="ts">
import { reactive, ref } from 'vue'

import Form from '@/components/Form.vue'
import FormInputText from '@/components/FormInputText.vue'
import type { Nullable } from '@/types'
import ErrorModal from '@components/ErrorModal.vue'
import PrimaryBtn from '@components/PrimaryBtn.vue'
import Tabs from '@components/Tabs.vue'
import AppLogo from '@components/icons/AppLogo.vue'

import { Strategy, type User, loginService, validatePassowrd, validateUsername } from './services'

const option = ref<string>('Sign In')

function updateOption(opt: string) {
    option.value = opt
}

const validPassword = ref<boolean>(false)
const validUsername = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)
const error = ref<Nullable<string>>(null)

const formData = reactive<User>({
    username: '',
    password: ''
})

async function handleSubmit() {
    error.value = null
    const strategy = option.value === 'Sign In' ? Strategy.Login : Strategy.Register
    const res = await loginService(strategy, formData)
    if (res.ok) {
        throw new Error('Not implemented')
    }
    error.value = res.message
}
</script>

<template>
    <ErrorModal v-if="error" @close="error = null" :error="error" />
    <section class="flex flex-col items-center justify-center p-4">
        <div class="mb-8 text-center">
            <div class="flex items-center justify-center">
                <AppLogo />
                <h1 class="ml-2 text-3xl font-bold text-white">Stock App</h1>
            </div>
            <p class="mt-2 text-gray-400">Track stocks with precision</p>
        </div>

        <Tabs :tabs="['Sign In', 'Sign Up']" :default="option" @update:value="updateOption" />

        <Form name="login" :submitcb="handleSubmit" @isSubmitting="isSubmitting = $event">
            <section class="flex flex-col items-center justify-between gap-4">
                <section class="flex w-full max-w-md flex-col items-center justify-center gap-4">
                    <label for="username" class="flex w-full flex-col gap-1"
                        ><span class="text-sm font-medium text-gray-300">Email </span>
                        <FormInputText
                            type="text"
                            name="username"
                            placeholder="alexis@example.com"
                            @update:value="formData.username = $event"
                            @update:valid="validUsername = $event"
                            :default="formData.username"
                            :validatecb="validateUsername"
                            :readonly="isSubmitting"
                        />
                    </label>

                    <label for="password" class="w-full flex-col gap-1"
                        ><span class="text-sm font-medium text-gray-300">Password</span>

                        <FormInputText
                            type="password"
                            name="password"
                            placeholder="**********"
                            :default="formData.password"
                            @update:value="formData.password = $event"
                            @update:valid="validPassword = $event"
                            :validatecb="validatePassowrd"
                            :readonly="isSubmitting"
                        />
                    </label>
                </section>

                <PrimaryBtn
                    :text="isSubmitting ? 'Loading...' : 'Confirm'"
                    type="submit"
                    form="login"
                    :disabled="!validUsername || !validPassword || isSubmitting"
                />
            </section>
        </Form>
    </section>
</template>
