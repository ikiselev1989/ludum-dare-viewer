<template>
    <transition name="fade" v-if="visible">
        <Overlay>
            <div class="loading">
                <i class="loading__icon fas fa-2x fa-cog"></i>
                <p class="loading__title">Loading...</p>
            </div>
        </Overlay>
    </transition>
</template>

<script>
    import {LOADING_TOGGLE} from '../constants/events'
    import Overlay from './Overlay'

    export default {
        name: "LoadingInfo",
        components: {
            Overlay
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            visibleToggle(value) {
                return this.visible = value
            }
        },
        mounted() {
            this.$root.$on(LOADING_TOGGLE, this.visibleToggle.bind(this))
        }
    }
</script>

<style scoped lang="scss">
    @-webkit-keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }

    .loading {
        @apply flex items-center;

        &__title {
            @apply ml-2 text-2xl text-white;
        }

        &__icon {
            @apply text-white;
            animation: rotation 2s infinite linear;
        }
    }
</style>