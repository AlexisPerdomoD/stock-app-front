<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import ErrorModal from '@components/ErrorModal.vue'
import Form from '@components/Form.vue'
import FormInputText from '@components/FormInputText.vue'
import PrimaryBtn from '@components/PrimaryBtn.vue'
import Tabs from '@components/Tabs.vue'
import AppLogo from '@components/icons/AppLogo.vue'
import { APi_SESSION_KEY } from '@shared/constants'
import type { Nullable } from '@shared/types'

import { validatePassowrd, validateUsername } from './helpers'
import { Strategy, type User, loginService } from './services'

const router = useRouter()

onBeforeMount(() => {
    if (sessionStorage.getItem(APi_SESSION_KEY)) {
        router.push('/')
    }
})

const validPassword = ref<boolean>(false)
const validUsername = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

const error = ref<Nullable<string>>(null)
const option = ref<string>('Sign In')

const formData = reactive<User>({
    username: '',
    password: ''
})

async function handleSubmit() {
    error.value = null
    const strategy = option.value === 'Sign In' ? Strategy.Login : Strategy.Register
    const res = await loginService(strategy, formData)

    if (!res.ok) {
        error.value = res.message

        return
    }

    router.push('/')
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

        <Tabs :tabs="['Sign In', 'Sign Up']" :default="option" @update:value="option = $event" />

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
