import { Vue, Component, Prop } from 'vue-property-decorator'

import template from "./CloseButton.vue";

@Component({
    mixins: [template]
})

export default class CloseButton extends Vue {
    public created() {
        // When the component gets created.
    }

    public mounted() {

    }
}