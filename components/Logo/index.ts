import { Vue, Component, Prop } from 'vue-property-decorator'

import template from "./Logo.vue";

@Component({
    mixins: [template]
})

export default class Logo extends Vue {
    public created() {
        // When the component gets created.
    }

    public mounted() {

    }
}