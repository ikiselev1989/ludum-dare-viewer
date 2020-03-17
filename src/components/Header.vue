<template>
    <div class="header">
        <a class="header__item logo" :href="rootPath">
            <span v-for="word in ['Ludum','Dare','Viewer']" :key="word" :class="`logo__${word.toLowerCase()}`">{{ word }}</span>
        </a>

        <form class="header__item filter-form">
            <select v-model="currentEvent" name="event" title="event" id="event"
                    class="filter-form__selector" @change="eventChange">
                <option v-for="event in events" :value="event">{{ `Ludum Dare #${event}` }}</option>
            </select>

            <select v-model="currentType" name="type" title="type" id="type"
                    class="filter-form__selector" @change="filterChange">
                <option class="text-right" v-for="type in types" :value="type">{{ type }}</option>
            </select>

            <input id="addition-filter" type="checkbox" class="filter-form__addition-filter-input"/>

            <label for="addition-filter" title="platform filter" class="filter-form__addition-filter">
                <i class="loading__icon fas fa-cog"></i>
                <span>{{ platforms.length > 0 ? platforms.length : '' }}</span>
            </label>

            <div class="filter-form__additional-filter-list [ w-full ]">
                <Checkbox id="html5" text="HTML5" v-model="platforms" @change="filterChange"></Checkbox>
                <Checkbox id="win" text="Win" v-model="platforms" @change="filterChange"></Checkbox>
                <Checkbox id="macos" text="MacOS" v-model="platforms" @change="filterChange"></Checkbox>
                <Checkbox id="linux" text="Linux" v-model="platforms" @change="filterChange"></Checkbox>
            </div>
        </form>

        <!--<div class="header__item login">-->
            <!--<a href="#" class="login__link" @click.prevent="loginModal">Login</a>-->
        <!--</div>-->

        <div class="header__item about">
            <a class="about__link" href="#" @click.prevent="aboutModal">About</a>
            <i class="fas fa-info-circle"></i>
        </div>
    </div>
</template>

<script>
    import {
        CURRENT_EVENT,
        CURRENT_TYPE,
        FILTERED_LIST,
        LIST,
        NODE_ID,
        PAGE,
        PAGE_NUMBER,
        PLATFORMS
    } from '../constants/store'
    import {ABOUT_MODAL_TOGGLE, LOADING_TOGGLE} from '../constants/events'
    import Checkbox from './partials/Checkbox'

    export default {
        data() {
            return {
                rootPath: process.env.BASE_URL,
                events: [],
                types: ['All', 'Compo', 'Jam'],
                filterActive: false
            }
        },
        components: {
            Checkbox
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
            },
            platforms: {
                get() {
                    return this.$store.getters[PLATFORMS]
                },
                set(value) {
                    this.$store.commit(PLATFORMS, value)
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
            async eventChange() {
                this.loadingToggleAnimation(async () => {
                    this.resetPageNumber()
                    await this.nodeIdUpdate()
                    await this.listUpdate()
                    await this.filteredListUpdate()
                    await this.pageUpdate()
                })
            },
            async filterChange() {
                this.resetPageNumber()
                await this.filteredListUpdate()
                await this.pageUpdate()
            },
            async loadingToggleAnimation(action) {
                this.$root.$emit(LOADING_TOGGLE, true)

                await action()

                this.$root.$emit(LOADING_TOGGLE, false)
            },
            async Init() {
                await this.$store.dispatch(CURRENT_EVENT)

                await this.eventChange()
                this.setData()
            },
            async nodeIdUpdate() {
                await this.$store.dispatch(NODE_ID)
            },
            async listUpdate() {
                await this.$store.dispatch(LIST)
            },
            async filteredListUpdate() {
                await this.$store.dispatch(FILTERED_LIST)
            },
            async pageUpdate() {
                await this.$store.dispatch(PAGE)
            },
            resetPageNumber() {
                this.$store.commit(PAGE_NUMBER, 0)
            },
            aboutModal() {
                this.$root.$emit(ABOUT_MODAL_TOGGLE, true)
            }
            // loginModal() {
            //     this.$root.$emit(LOGIN_MODAL_TOGGLE, true)
            // }
        },
        mounted() {
            this.Init()
        }
    }
</script>

<style scoped lang="scss">
    .header {
        @apply p-5 flex flex-col justify-between items-center relative font-mono bg-gray-800 z-30;

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
        $filter-form: &;

        @apply flex items-center;

        &__addition-filter-input {
            @apply hidden;

            &:checked {
                & + #{$filter-form}__addition-filter {
                    @apply text-orange-600;

                    & + #{$filter-form}__additional-filter-list {
                        @apply opacity-100;
                    }
                }
            }
        }

        &__addition-filter {
            @apply ml-6 text-white cursor-pointer transition-colors duration-200;
        }

        &__additional-filter-list {
            @apply px-6 py-4;
            @apply flex justify-center;
            @apply absolute bottom-0 left-0;
            @apply text-white bg-gray-800 border-t-2 border-white;
            @apply transform translate-y-full opacity-0 transition-opacity duration-200;
        }

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

    .about {
        @apply mt-6;
        @apply text-white;

        @screen md {
            @apply mt-0;
        }

        &__link {
            @apply p-2;
        }
    }
</style>