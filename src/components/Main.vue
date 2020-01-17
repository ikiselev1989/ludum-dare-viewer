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

                <!--<a :href="value.url" target="_blank" class="stretched-link"></a>-->
            </div>
        </div>
    </section>
</template>

<script>
    import {NODE_ID, LIST} from '../constants/store'

    export default {
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
