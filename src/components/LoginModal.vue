<template>
    <transition name="fade">
        <div v-if="visible" class="login-modal [ w-full h-full ]">
            <div class="login-modal__bg [ w-full h-full ]"></div>
            <form name="login-form" class="login-modal__form" @submit.prevent="submit">
                <label for="login">Login</label>
                <input id="login" type="text" title="login" v-model="form.login">
                <label for="password">Password</label>
                <input id="password" type="password" title="password" v-model="form.pw">
                <button type="submit" class="submit">Login</button>
            </form>
            <div class="login-modal__close" @click="close">
                <i class="fas fa-2x fa-times"></i>
            </div>
        </div>
    </transition>
</template>

<script>
    import {USER} from '../constants/store'

    export default {
        name: "LoginModal",
        data() {
            return {
                visible: false,
                form: {
                    login: '',
                    pw: ''
                }
            }
        },
        methods: {
            close() {
                this.$root.$emit('login-modal', false)
            },
            visibleToggle(value) {
                return this.visible = value
            },
            async submit() {
                await this.$store.dispatch(USER, this.form)
            }
        },
        mounted() {
            this.$root.$on('login-modal', this.visibleToggle.bind(this))
        }
    }
</script>

<style scoped lang="scss">
    .login-modal {
        @apply fixed flex justify-center items-center;

        &__bg {
            @apply bg-gray-900;
            opacity: 0.9;
        }

        &__form {
            @apply p-2 absolute max-w-screen-sm flex flex-col;

            label {
                @apply mt-4 text-white;

                &:first-child {
                    @apply mt-0;
                }
            }

            input[type=text],
            input[type=password] {
                @apply mt-2 px-3 py-1 appearance-none shadow-inner rounded outline-none transition-colors duration-200;
                max-width: 200px;

                &:hover,
                &:active {
                    @apply bg-gray-200;
                }
            }
        }

        &__close {
            @apply absolute top-0 right-0 mt-6 mr-6 text-white cursor-pointer;
        }
    }

    .submit {
        @apply mt-12 p-2 text-gray-100 font-mono rounded outline-none border-2 border-white transition-colors duration-100;

        &:hover,
        &:active {
            @apply bg-white text-gray-900;
        }
    }
</style>