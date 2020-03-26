import { Vue, Component, Prop } from 'vue-property-decorator';

import template from "./Backdrop.vue";

@Component({
    name: 'Backdrop',
    mixins: [template]
})

export default class Backdrop extends Vue {

    @Prop({ type: Boolean, default: true }) public closeable!: boolean;
    @Prop({ type: Boolean, default: false }) public fixed!: boolean;
    @Prop({ type: Object, default: () => ({
        name: 'slide-up',
        mode: 'out-in',
        appear: true
    })}) public transition!: object;
    @Prop({ type: Object, default: () => ({})}) public context!: object;

    public vm: any = this;
    public visible: boolean = true;

    public created() {
        // When the component gets created.
        let bus = this.$root;
        bus.$emit('backdropVisible');
        this.$on('closeRequest', () => {
            this.visible = false;
        });
    }

    public beforeLeave() {
        this.$emit('beforeLeave');
    }

    public beforeDestroy() {
        let bus = this.$root;
        bus.$emit('backdropHidden');
    }

    public mounted() {

    }
}