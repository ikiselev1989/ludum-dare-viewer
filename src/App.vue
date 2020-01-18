<template>
    <div id="app" class="[ bg-gray-400 ]">
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

<style src="./assets/tailwind.css"></style>
