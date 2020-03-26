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
                    text: '\n\nDECLARAȚIE PE PROPRIE RĂSPUNDERE\n\n\n',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    columns: [
                        {
                            width: 150,
                            text: [
                                {text: 'Nume, prenume: ', bold: true}, '\n',
                                {text: 'Data nașterii: ', bold: true}, '\n',
                                {text: 'Adresa locuinței: ', bold: true}, '\n',
                            ]
                        },
                        {
                            text: [
                                this.form.name, ' ', this.form.surname, '\n',
                                this.form.birthDate, '\n',
                                this.form.address.city, ', județul/sectorul ', this.form.address.county, ', strada ', this.form.address.street,  '\n',
                                this.form.address.flat ? 'bloc ' + this.form.address.flat + ', ' : '', 
                                this.form.address.floor ? 'etaj ' + this.form.address.floor + ', ' : '',
                                this.form.address.appartment ? 'apartament ' + this.form.address.appartment + ', \n\n' : '\n',
                                {
                                    text: 'Se va completa adresa locuinței în care persoana locuiește în fapt, indiferent dacă este identică sau nu cu cea menționată în actul de identitate.\n\n\n',
                                    fontSize: 9
                                }
                            ]
                        }
                    ]
                },
                {
                    text: [
                        {text: 'Locul/locurile deplasării: ', bold: true}, '\n\n',
                        'Mă deplasez în interes ', this.form.interest == '1' ? 'personal' : 'profesional', 
                        ' intre orele ', this.form.startTime, ' - ', this.form.endTime, 
                        ', de la ', this.form.from, ', până la ', this.form.to, '.\n\n',
                        {
                            text: 'Se vor menționa locurile în care persoana se deplasează, în ordinea în care aceasta intenționează să-și desfășoare traseul.\n\n\n\n',
                            fontSize: 9
                        }
                    ]
                },
                {
                    text: [
                        {text: 'Motivul deplasării: ', bold: true}, '\n\n',
                    ],
                    style: 'marginBottom'
                },
                {
                    type: 'square',
                    ul: reasons
                },
                {
                    text: [
                        {
                            text: '\nSe va bifa doar motivul/motivele deplasării dintre cele prevăzute în listă, nefiind permise deplasări realizate invocând alte motive decât cele prevăzute în Ordonanța Militară nr. 3/2020.\n\n\n\n\n\n\n\n',
                            fontSize: 9
                        }
                    ]
                },
                {
                    columns: [
                        {
                            text: [
                                {text: 'Data declarației: ', bold: true}, this.form.signingDate, '\n',  
                            ]
                        },
                        {
                            text: [
                                {text: 'Semnătura: ', bold: true}, '............................', '\n\n\n',
                            ]
                        }
                    ]
                },
                {
                    text: "Persoanele care au împlinit vârsta de 65 de ani completează doar pentru motivele prevăzute în câmpurile 1-6, deplasarea fiind permisă zilnic doar în intervalul orar 11.00 – 13.00. ",
                    style: 'smaller',
                    bold: true
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
                },
                marginBottom: {
                    margin: [0, 0, 50, 0]
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