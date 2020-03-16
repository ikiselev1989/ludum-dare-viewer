<template>
    <label :for="id" class="checkbox">
        <input class="checkbox__input" type="checkbox" :id="id" v-model="checked" :value="id" @change="onChange">
        <span class="checkbox__mark [ w-4 h-4 ]">
            <i class="fas fa-check | checkbox__check"></i>
        </span>
        {{ text }}
    </label>
</template>

<script>
    export default {
        name: "Checkbox",
        props: ['id', 'text', 'value'],
        data() {
            return {
                checkedProxy: false
            }
        },
        computed: {
            checked: {
                get() {
                    return this.value
                },
                set(val) {
                    this.checkedProxy = val
                }
            }
        },
        methods: {
            onChange: function (e) {
                this.$emit('input', this.checkedProxy)
            }
        }
    }
</script>

<style scoped lang="scss">
    .checkbox {
        $root: &;

        @apply flex items-center;
        @apply cursor-pointer;

        & + & {
            @apply ml-4;
        }

        &__input {
            @apply hidden;

            &:checked {
                & + #{$root}__mark {
                    #{$root}__check {
                        @apply opacity-100;
                    }
                }
            }
        }

        &__mark {
            @apply mr-2 p-1;
            @apply flex justify-center items-center;
            @apply border-2 border-white;
        }

        &__check {
            @apply opacity-0;
            @apply transition-opacity duration-200;
        }
    }
</style>