<template>
    <div id="app" class="[ flex flex-col min-h-screen bg-gray-400 ]">
        <Header/>
        <Main/>
        <Overlay/>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Main from './components/Main.vue'
    import Overlay from './components/Overlay'

    export default {
        name: 'app',
        components: {
            Overlay,
            Header,
            Main
        }
    }
</script>

<style lang="scss">
    @import './assets/tailwind.css';
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css');

    .fade-enter-active, .fade-leave-active {
        @apply transition-opacity duration-500;
    }

    .fade-enter, .fade-leave-to {
        @apply opacity-0;
    }
</style>
