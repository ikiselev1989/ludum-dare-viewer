<template>
    <section class="list [ container ]">
        <div class="list__container [ w-full ]">
            <div v-if="this.$store.getters.list.length === 0" class="not-found [ m-auto ]">Games not found. Select
                another event.
            </div>
            <div class="card [ w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 ]"
                 v-for="value in this.$store.getters.list"
                 :key="value.id">

                <div class="card__container">
                    <a :href="value.url" target="_blank">
                        <img :src="value.cover" :alt="value.name" class="card__image [ w-full h-64 sm:h-48 ]"/>
                    </a>

                    <a :href="value.url" target="_blank" class="card__text-container">
                        <span :class="`event-type event-type--${value.type}`">{{ value.type }}</span>
                        <h5>{{ value.name }}</h5>
                    </a>

                    <!--<a :href="value.url" target="_blank" class="card__link"></a>-->

                    <div class="card__footer">
                        <a v-if="src[0]"
                           v-for="(src, index) in value.sources" :key="index" :href="src[1]" :title="src[2]"
                           v-html="src[0]"
                           target="_blank"
                           class="card__source-link [ w-10 h-10 text-gray-800 ]">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.$store.getters.list.length > 0" class="pagination">
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
            @apply h-full relative flex flex-col bg-gray-100;
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

        &__footer {
            @apply mt-auto flex flex-wrap;
        }

        &__source-link {
            @apply m-1 flex justify-center items-center;
        }
    }

    .pagination {
        @apply my-8 flex justify-center;
    }

    .not-found {
        @apply text-2xl;
    }
</style>
