<template>
    <div id="app" class="[ flex flex-col min-h-screen bg-gray-400 ]">
        <Header/>
        <Main/>
        <LoadingInfo/>
        <LoginModal/>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Main from './components/Main.vue'
    import LoadingInfo from './components/LoadingInfo'
    import LoginModal from './components/LoginModal'

    export default {
        name: 'app',
        components: {
            LoadingInfo,
            Header,
            Main,
            LoginModal
        }
    }
</script>

<style lang="scss">
    @import './assets/tailwind.css';
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css');

    @font-face {
        font-family: LudumDairy;
        src: url("./assets/Ludum-Dairy.ttf");
        font-weight: 400;
        font-style: normal;
    }

    .fade-enter-active, .fade-leave-active {
        @apply transition-opacity duration-500;
    }

    .fade-enter, .fade-leave-to {
        @apply opacity-0;
    }
</style>
