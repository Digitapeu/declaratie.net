import { Vue, Component, Prop } from 'vue-property-decorator'

import template from "./BackButton.vue";

@Component({
    mixins: [template]
})

export default class BackButton extends Vue {
    public created() {
        // When the component gets created.
    }

    public mounted() {

    }
}