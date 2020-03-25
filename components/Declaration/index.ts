import { Vue, Component, Prop } from 'vue-property-decorator';

import Drawer from '@/components/Drawer';
import Backdrop from '@/components/Backdrop';

import template from "./Declaration.vue";

@Component({
    mixins: [template],
    components: {
        Drawer,
        Backdrop
    }
})

export default class Declaration extends Vue {

    @Prop() form: any
    
    public created() {
        // When the component gets created.
    }

    public mounted() {

    }
}