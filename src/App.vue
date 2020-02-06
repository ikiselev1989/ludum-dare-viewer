<template>
    <div id="app" class="[ flex flex-col min-h-screen bg-gray-400 ]">
        <Header/>
        <Main/>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Main from './components/Main.vue'

    export default {
        name: 'app',
        components: {
            Header,
            Main
        }
    }
</script>

<style>
    @import './assets/tailwind.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css';
</style>
