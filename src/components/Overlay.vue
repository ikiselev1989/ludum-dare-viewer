<template>
    <transition name="fade">
        <div v-if="visible" class="overlay [ w-full h-full ]">
            <div class="overlay__bg [ w-full h-full ]"></div>
            <div class="overlay__text [ w-full h-full ]">
                <i class="fas fa-2x fa-cog"></i>
                <p class="overlay__title">Loading...</p>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Overlay",
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
            this.$root.$on('visible-toggle', this.visibleToggle.bind(this))
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

    .overlay {
        @apply fixed;

        &__bg {
            @apply bg-gray-900;
            opacity: 0.9;
        }

        &__text {
            @apply absolute inset-0 flex flex-col justify-center items-center;
        }

        &__title {
            @apply text-2xl text-white;
        }

        .fas {
            @apply text-white;
            animation: rotation 2s infinite linear;
        }
    }
</style>