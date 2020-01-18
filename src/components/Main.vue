<template>
    <section class="list [ container ]">
        <div class="list__container [ w-full ]">
            <div class="card [ w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ]"
                 v-for="value in this.$store.getters.list"
                 :key="value.id">

                <div class="card__container">
                    <div>
                        <img :src="value.cover" :alt="value.name" class="card__image [ w-full h-64 sm:h-48 ]"/>
                    </div>

                    <div class="card__text-container">
                        <span :class="`event-type event-type--${value.type}`">{{ value.type }}</span>
                        <h5>{{ value.name }}</h5>
                    </div>

                    <a :href="value.url" target="_blank" class="card__link"></a>
                </div>
            </div>
        </div>
        <div class="pagination">
            <button v-if="paginationPrevAvailable" v-on:click="prev" class="btn btn--prev [ w-24 h12 mr-2 ]">
                &lt;&lt; Prev
            </button>
            <button v-if="paginationNextAvailable" v-on:click="next" class="btn btn--next [ w-24 h12 ]">
                Next &gt;&gt;
            </button>
        </div>
    </section>
</template>

<script>
    import {LIST, PAGE} from '../constants/store'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                page: PAGE,
                list: LIST
            }),
            paginationNextAvailable() {
                return this.list.length > 0
            },
            paginationPrevAvailable() {
                return this.page > 0
            }
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
        }
    }
</script>

<style scoped lang="scss">
    .event-type {
        @apply uppercase font-bold;

        &--compo {
            @apply text-orange-500;
        }

        &--jam {
            @apply text-orange-600;
        }
    }

    .btn {
        @apply p-1 text-gray-100 font-mono rounded;

        &--prev {
            @apply bg-gray-600;
        }

        &--next {
            @apply bg-orange-600;
        }
    }

    .list {
        @apply m-auto;

        &__container {
            @apply flex flex-wrap;
        }
    }

    .card {
        @apply p-2 flex flex-col;

        &__container {
            @apply relative bg-gray-100;
        }

        &__image {
            @apply object-cover;
        }

        &__text-container {
            @apply p-3 font-mono;
        }

        &__link {
            &:after {
                content: '';
                @apply absolute inset-0 z-10;
            }
        }
    }

    .pagination {
        @apply mt-8 flex justify-center;
    }
</style>
