<template>
    <div class="backdrop-wrapper">

        <!-- This is the dim background -->
        <transition :name="'fade-in'" mode="out-in" appear @afterLeave="$emit('close');">
            <div v-if="visible" class="backdrop" @click="closeable && (visible = false)"></div>
        </transition>

        <!-- This is the content -->
        <transition :name="transition.name" :mode="transition.mode" :appear="transition.appear" @enter="$root.$emit('backdropMounted')">
            <slot v-if="visible && !!$slots.default"></slot>
        </transition>

    </div>
</template>

<script>
export default {
    name: 'Backdrop',
    props: {
        closeable: {
            type: Boolean,
            default: true
        },
        fixed: {
            type: Boolean,
            default: false
        },
        transition: {
            default: () => ({
                name: 'slide-up',
                mode: 'out-in',
                appear: true
            }),
            type: Object
        },
        context: {
            type: Object,
            default: () => ({})
        }
    },
    data(){
        let vm = this;
        let store = vm.$store || vm.context.store;
        return {
            vm: vm,
            visible: true,
        }
    },
    created(){
        let bus = this.$root;
        bus.$emit('backdropVisible');
        this.$on('closeRequest', () => {
            this.visible = false;
        });
    },
    beforeLeave(){
        this.$emit('beforeLeave');
    },
    beforeDestroy(){
        let bus = this.$root;
        bus.$emit('backdropHidden');
    }
}

</script>

<style lang="less" scoped>
.backdrop-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    top: 0; left: 0; right: 0; bottom: 0;

    @media screen and (min-width: 990px){
        justify-content: center;
        align-items: center;
    }

    .backdrop {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,.85);
        transform: translate3d(0,0,0)
    }
}
</style>