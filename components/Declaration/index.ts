import { Vue, Component, Prop } from 'vue-property-decorator';

let pdfMake = require('pdfmake/build/pdfmake.js');
let pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

        let reasons = JSON.parse(JSON.stringify(this.form.reasons));

        let dd = {
            content: [
                {
                    text: '\n\nDeclarație pe proprie răspundere,\n\n\n',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: [
                        'Subsemnatul(a) ', {text: this.form.name, fontSize: 14, bold: true}, ' ', {text: this.form.surname, fontSize: 14, bold: true}, ', ',
                        this.form.descendant == '1' ? 'fiica' : 'fiul', ' lui ', {text: this.form.father, fontSize: 14, bold: true}, ' și al lui ', {text: this.form.mother, fontSize: 14, bold: true}, ', ',
                        'domiciliat(ă) în ', {text: this.form.address.city, fontSize: 14, bold: true}, ', județul/sectorul ', {text: this.form.address.county, fontSize: 14, bold: true}, ', ',
                        'strada ', {text: this.form.address.street, fontSize: 14, bold: true}, ', ', 
                        {text: this.form.address.flat ? 'bloc ' + this.form.address.flat + ', ' : '', fontSize: 14, bold: true},
                        {text: this.form.address.floor ? 'etaj ' + this.form.address.floor + ', ' : '', fontSize: 14, bold: true},
                        {text: this.form.address.appartment ? 'apartament ' + this.form.address.appartment + ', ' : '', fontSize: 14, bold: true},
                        'având CNP ', {text: this.form.cnp, fontSize: 14, bold: true}, ', BI/CI seria ', {text: this.form.id.series, fontSize: 14, bold: true}, 
                        ', număr ', {text: this.form.id.number, fontSize: 14, bold: true}, ',\n\n'
                    ]
                },
                {
                    text: [
                        'Locuind în fapt(1) în localitatea ', {text: this.form.residence.city, fontSize: 14, bold: true}, 
                        ', județul/sectorul ', {text: this.form.residence.county, fontSize: 14, bold: true}, ', ',
                        'strada ', {text: this.form.residence.street, fontSize: 14, bold: true}, ', ', 
                        {text: this.form.residence.flat ? 'bloc ' + this.form.residence.flat + ', ' : '', fontSize: 14, bold: true},
                        {text: this.form.residence.floor ? 'etaj ' + this.form.residence.floor + ', ' : '', fontSize: 14, bold: true},
                        {text: this.form.residence.appartment ? 'apartament ' + this.form.residence.appartment + ', ' : '', fontSize: 14, bold: true},
                        '\n\n'
                    ]
                },
                {
                    text: [
                        'Cunoscând prevederile articolului 326, referitoare la falsul în declarații(2), precum si ale art. 352 referitoare la zădărnicirea combaterii bolilor din Noul Cod Penal,',
                        'declar pe proprie răspundere faptul că mă deplasez în interes ', {text: this.form.interest == '1' ? 'personal' : 'profesional', fontSize: 14, bold: true}, 
                        ' intre orele ', {text: this.form.startTime, fontSize: 14, bold: true}, ' - ', {text: this.form.endTime, fontSize: 14, bold: true},
                        ' de la ', {text: this.form.from, fontSize: 14, bold: true},', până la ', {text: this.form.to, fontSize: 14, bold: true}, ', pentru(3): \n\n'
                    ]
                },
                {
                    type: 'square',
                    ul: reasons
                },
                {
                    text: [
                        '\n\n\n', 'Atât declar, susțin și semnez.\n',
                        {text: 'Data: ', bold: true}, this.form.signingDate, '\n', 
                        {text: 'Semnătura: ', bold: true}, this.form.name + ' ' + this.form.surname, '\n\n\n\n\n\n\n\n\n\n', 
                    ]
                },
                {
                    ol: [
                        'Se declară situația în care persoana nu locuiește la domiciliul prevăzut în actul de identitate.',
                        'Declararea necorespunzătoare a adevărului, făcută unei persoane dintre cele prevăzute in art. 175 sau unei unități în care aceasta își desfășoară activitatea în vederea producerii unei consecințe juridice, pentru sine sau pentru altul, atunci când, potrivit legii ori împrejurarilor, declarația făcută servește la producerea acelei consecințe, se depedpește de la 3 luni la 2 ani sau cu amendă.',
                        'Se completează motivul/cauzele deplasării.'
                    ],
                    style: 'smaller'
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                smaller: {
                    fontSize: 9,
                    italics: true
                },
                bigger: {
                    fontSize: 15,
                    italics: true
                }
            }
            
        }

        this.doc = pdfMake.createPdf(dd)

    }

    public onDocumentPrint() {
        this.doc.print();
    }

    public onDocumentSave() {
        let date = new Date().getTime();
        this.doc.download(`declaratie_raspundere_personala_${date}.pdf`);
    }
}