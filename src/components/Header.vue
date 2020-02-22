<template>
    <div class="header">
        <div class="header__item logo">
            <span v-for="word in ['Ludum','Dare','Viewer']" :key="word" :class="`logo__${word.toLowerCase()}`">{{ word }}</span>
        </div>

        <form @change="formChange" class="header__item filter-form">
            <select v-model="currentEvent" name="event" title="event" id="event" class="filter-form__selector">
                <option v-for="event in events" :value="event">{{ `Ludum Dare #${event}` }}</option>
            </select>

            <select v-model="currentType" name="type" title="type" id="type" class="filter-form__selector">
                <option class="text-right" v-for="type in types" :value="type">{{ type }}</option>
            </select>
        </form>

        <div class="header__item login">
            <!--<a href="#" class="login__link" @click.prevent="loginModal">Login</a>-->
        </div>
    </div>
</template>

<script>
    import {CURRENT_EVENT, CURRENT_TYPE, LIST, NODE_ID} from '../constants/store'
    import {LOADING_TOGGLE, LOGIN_MODAL_TOGGLE} from '../constants/events'

    export default {
        data() {
            return {
                events: [],
                types: ['All', 'Compo', 'Jam'],
            }
        },
        computed: {
            currentEvent: {
                get() {
                    return this.$store.state[CURRENT_EVENT]
                },
                set(value) {
                    this.$store.commit(CURRENT_EVENT, value)
                }
            },
            currentType: {
                get() {
                    return this.$store.getters[CURRENT_TYPE]
                },
                set(value) {
                    this.$store.commit(CURRENT_TYPE, value)
                }
            }
        },
        methods: {
            async setData() {
                let events = []

                for (let i = 0; i < 5; i++) {
                    const eventNumber = parseInt(this.currentEvent) - i
                    if (eventNumber > 0) {
                        events.push(eventNumber)
                    }
                }

                this.events = events
            },
            async formChange() {
                this.$root.$emit(LOADING_TOGGLE, true)

                await this.$store.dispatch(NODE_ID)
                await this.$store.dispatch(LIST)

                this.$root.$emit(LOADING_TOGGLE, false)
            },
            async Init() {
                await this.$store.dispatch(CURRENT_EVENT)

                await this.formChange()
                this.setData()
            },
            loginModal() {
                this.$root.$emit(LOGIN_MODAL_TOGGLE, true)
            }
        },
        mounted() {
            this.Init()
        }
    }
</script>

<style scoped lang="scss">
    .header {
        @apply p-5 flex flex-col justify-between items-center font-mono bg-gray-800;

        @screen md {
            @apply flex-row;
        }

        &__item {
            @apply mt-2;

            @screen md {
                @apply mt-0;
            }

            &:first-child {
                @apply mt-0;
            }
        }
    }

    .filter-form {
        &__selector {
            @apply px-3 py-1 appearance-none cursor-pointer shadow-inner rounded outline-none transition-colors duration-200;
            text-align-last: right;

            &:hover,
            &:active {
                @apply bg-gray-200;
            }

            & + & {
                @apply ml-4;
            }
        }
    }

    .logo {
        @apply text-2xl;
        font-family: LudumDairy, serif;

        @screen md {
            @apply text-3xl;
        }

        &__ludum {
            @apply text-orange-600;
        }

        &__dare {
            @apply text-orange-500;
        }

        &__viewer {
            @apply text-white;
        }
    }

    .login {
        @apply text-white;

        &__link {
            @apply p-2;
        }
    }
</style>