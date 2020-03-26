import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

import CloseButton from '@/components/CloseButton';
import BackButton from '@/components/BackButton';

import template from "./Drawer.vue";

@Component({
    name: 'Drawer',
    mixins: [template],
    components: {
        CloseButton,
        BackButton
    }
})

export default class Drawer extends Vue {

    @Prop() public fixed!: any;
    @Prop() public title!: any;
    @Prop() public secure!: any;
    @Prop() public closeable!: any;
    @Prop() public changeable!: any;

    public showSecure: boolean = false;

    public created() {
        // When the component gets created.
    }

    public mounted() {
        let vm = this;
        vm.secure && setTimeout(() => {
            vm.showSecure = true;
        }, 250);
    }

    @Emit()
    swiped(direction: string) {
        let vm = this;

        if(!vm.closeable || typeof vm.closeable === 'object' && vm.closeable.preventDown) {
            return;
        }

        switch(direction){
            case 'bottom': return vm.$emit('close');
        }
    }
}