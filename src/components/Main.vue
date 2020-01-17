<template>
    <section class="[ container m-auto ]">
        <div class="[ w-full flex flex-wrap ]">
            <div class="[ w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 flex flex-col ]"
                 v-for="value in this.$store.getters.list"
                 :key="value.id">

                <div class="wrapper bg-gray-100">
                    <div class="">
                        <img :src="value.cover" :alt="value.name" class="[ w-full h-64 sm:h-48 object-cover ]"/>
                    </div>

                    <div class="p-3 font-mono">
                        <span :class="`subsubtype subsubtype-${value.type} font-bold`">{{ value.type }}</span>
                        <h5>{{ value.name }}</h5>
                    </div>
                </div>

                <!--<a :href="value.url" target="_blank" class=""></a>-->
            </div>
        </div>
        <div class="mt-8 flex justify-center">
            <button v-if="this.page > 0" v-on:click="prev"
                    class="w-24 h12 border-2 border-gray-600 font-mono mr-2">
                &lt;&lt; Prev
            </button>
            <button v-on:click="next" class="w-24 h12 border-2 border-gray-600 font-mono">Next &gt;&gt;</button>
        </div>
    </section>
</template>

<script>
    import {NODE_ID, LIST, PAGE} from '../constants/store'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                page: PAGE
            })
        },
        methods: {
            prev() {
                this.pagination(-1)
            },
            next() {
                this.pagination(1)
            },
            pagination(direction) {
                return this.$store.dispatch(PAGE, (this.page + direction))
            }
        },
        async mounted() {
            await this.$store.dispatch(NODE_ID)
            await this.$store.dispatch(LIST)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .subsubtype {
        color: #f79122;
        @apply .uppercase;
    }

    .subsubtype-jam {
        color: #e53;
    }
</style>
