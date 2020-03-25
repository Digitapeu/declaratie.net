import { Vue, Component, Prop } from 'vue-property-decorator'

import template from "./Steps.vue";

@Component({
    mixins: [template]
})

export default class Steps extends Vue {

    public step: number = 1;
    
    public buttonLabels: any = [
        'Urmatorul pas ( adresa )',
        'Ultimul pas ( detalii )',
        'Finalizeaza'
    ];
    
    public reasons: any = {
        work: 'Deplasarea între domiciliu și locul de muncă, atunci când activitatea profesională este esențială și nu poate fi organizată sub formă de lucru la distanță sau deplasarea în interes profesional care nu poate fi amânată.',
        consult: 'Consult medical de specialitate care nu poate fi amânat.',
        shopping: 'Deplasare pentru cumpărături de primă necesitate la unități comerciale din zona de domiciliu.',
        medicalCare: 'Deplasare pentru asigurarea asistenței pentru persoane în vârstă, vulnerabile sau pentru însoțirea copiilor.',
        shortBreak: 'Deplasare scurtă, lângă domiciliu, pentru desfășurarea de activități fizice individuale, în aer liber, cu excluderea oricărei forme de activitate sportivă colectivă.',
        petWalk: 'Deplasare scurtă, lângă domiciliu, legată de nevoile animalelor de companie.'
    };

    public form: any = {
        name: '',
        surname: '',
        cnp: '',
        id: {
          series: '',
          number: ''
        },
        descendant: '',
        mother: '',
        father: '',
        address: {
          city: '',
          county: '',
          street: '',
          number: '',
          flat: '',
          floor: '',
          appartment: ''
        },
        residence: {
          city: '',
          county: '',
          street: '',
          number: '',
          flat: '',
          floor: '',
          appartment: ''
        },
        interest: '',
        startTime: '',
        endTime: '',
        from: '',
        to: '',
        reasons: []
    };   

    public created() {
        // When the component gets created.
    }

    public mounted() {

    }
}