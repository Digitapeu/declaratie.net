import { Vue, Component, Prop } from 'vue-property-decorator';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

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

    @Prop() public form: any

    public doc: any = null
    
    public created() {
        // When the component gets created.
    }

    public mounted() {
        this.generatePdf();
    }

    public generatePdf() {
        this.doc = new jsPDF('p', 'mm', 'letter');
        let vm = this;

        html2canvas(<HTMLCanvasElement> document.querySelector("#capture"))
            .then((canvas: any) => {
                let width = vm.doc.internal.pageSize.getWidth();
                let height = vm.doc.internal.pageSize.getHeight();

                let widthRatio = width / canvas.width;
                let heightRatio = height / canvas.height;

                let ratio = widthRatio > heightRatio ? heightRatio : widthRatio

                const img = canvas.toDataURL("image/jpeg", 0.8);
                vm.doc.addImage(img, 'JPEG', 10, 10, canvas.width * ratio - 20, canvas.height * ratio - 20);
            });

    }

    public onDocumentPrint() {
        this.doc.autoPrint();
        this.doc.output('dataurlnewwindow');
    }

    public onDocumentSave() {
        this.doc.save('a4.pdf');
    }
}