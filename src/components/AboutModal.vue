<template>
    <transition name="fade" v-if="visible">
        <Overlay>
            <div class="about-modal">
                <h3>ABOUT</h3>
                <p>
                    This is a viewer for <a href="https://ldjam.com/" target="_blank">Ludum Dare</a> games.
                    <br/>
                    There is platforms filter and direct link for each platform.
                </p>
                <p>
                    If you want to contribute or star it, please check this <a
                        href="https://github.com/ikiselev1989/ludum-dare-viewer" target="_blank">Github</a> repository.
                </p>
                <div class="about-modal__close" @click="close">
                    <i class="fas fa-2x fa-times"></i>
                </div>
            </div>
        </Overlay>
    </transition>
</template>

<script>
    import {ABOUT_MODAL_TOGGLE} from '../constants/events'
    import Overlay from './Overlay'

    export default {
        name: "AboutModal",
        components: {
            Overlay
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            close() {
                this.$root.$emit(ABOUT_MODAL_TOGGLE, false)
            },
            visibleToggle(value) {
                return this.visible = value
            }
        },
        mounted() {
            this.$root.$on(ABOUT_MODAL_TOGGLE, this.visibleToggle.bind(this))
        }
    }
</script>

<style scoped lang="scss">
    .about-modal {
        @apply text-white;

        h3 {
            @apply mb-5;
            @apply text-xl;
            @apply font-bold;
            @apply uppercase;
        }

        p {
            @apply my-4;
            @apply leading-loose;
        }

        a {
            @apply underline;
        }

        &__close {
            @apply absolute top-0 right-0 mt-6 mr-6 text-white cursor-pointer;
        }
    }
</style>