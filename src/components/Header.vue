<template>
    <div class="header">
        <form @change="formChange">
            <select v-model="currentEvent" name="event" title="event" id="event" class="header__selector">
                <option v-for="event in events" :value="event">{{ `Ludum Dare #${event}` }}</option>
            </select>

            <select v-model="currentType" name="type" title="type" id="type" class="header__selector">
                <option class="text-right" v-for="type in types" :value="type">{{ type }}</option>
            </select>
        </form>
    </div>
</template>

<script>
    import {CURRENT_EVENT, CURRENT_TYPE, LIST, NODE_ID} from '../constants/store'
    import {mapState} from 'vuex'

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
                this.$root.$emit('visible-toggle', true)

                await this.$store.dispatch(NODE_ID)
                await this.$store.dispatch(LIST)

                this.$root.$emit('visible-toggle', false)
            },
            async Init() {
                await this.$store.dispatch(CURRENT_EVENT)

                await this.formChange()
                this.setData()
            }
        },
        mounted() {
            this.Init()
        }
    }
</script>

<style scoped lang="scss">
    .header {
        @apply p-5 flex justify-center font-mono bg-gray-800;

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
</style>