<template>
<div class="container">
<header>
    <Logo />
</header>
<main>
    <el-steps :active="step" align-center simple finish-status="success">
        <el-step title="Pas 1" @click.native="step = 1"></el-step>
        <el-step title="Pas 2" @click.native="step = 2"></el-step>
        <el-step title="Pas 3" @click.native="step = 3"></el-step>
    </el-steps>

    <el-form ref="form" :model="form">
        <el-row v-show="step === 1">
            <el-input v-model="form.name" placeholder="Nume"></el-input>
            <el-input v-model="form.surname" placeholder="Prenume"></el-input>
            <el-row class="descendants">
                <el-radio v-model="form.descendant" label="1" border>Fiica</el-radio>
                <el-radio v-model="form.descendant" label="2" border>Fiul</el-radio>
            </el-row>
            <el-divider>lui</el-divider>
            <el-row class="split">
                <el-input v-model="form.mother" placeholder="Mama"></el-input>
                <el-input v-model="form.father" placeholder="Tata"></el-input>
            </el-row>

            <el-divider>Carte de identitate</el-divider>
            <el-row class="split">
                <el-input v-model="form.id.series" maxlength="2">
                    <template slot="prepend">Serie</template>
                </el-input>
                <el-input v-model="form.id.number" maxlength="6">
                    <template slot="prepend">No.</template>
                </el-input>
            </el-row>
            <el-input v-model="form.cnp" placeholder="CNP" maxlength="13">
                <template slot="append">{{ 13 - form.cnp.length }}</template>
            </el-input>
        </el-row>
        
        <el-row v-show="step === 2">
            <el-divider content-position="center">Adresa din buletin</el-divider>
            <el-input v-model="form.address.city" placeholder="Oras"></el-input>
            <el-input v-model="form.address.county" placeholder="Judet"></el-input>
            <el-input v-model="form.address.street" placeholder="Strada"></el-input>
            <el-row class="address-details">
            <el-input v-model="form.address.flat" placeholder="Bloc"></el-input>
            <el-input v-model="form.address.floor" placeholder="Etaj"></el-input>
            <el-input v-model="form.address.appartament" placeholder="Apt."></el-input>
            </el-row>

            <el-divider content-position="center">Domiciliul curent</el-divider>
            <el-input v-model="form.residence.city" placeholder="Oras"></el-input>
            <el-input v-model="form.residence.county" placeholder="Judet"></el-input>
            <el-input v-model="form.residence.street" placeholder="Strada"></el-input>
            <el-row class="address-details">
            <el-input v-model="form.residence.flat" placeholder="Bloc"></el-input>
            <el-input v-model="form.residence.floor" placeholder="Etaj"></el-input>
            <el-input v-model="form.residence.appartament" placeholder="Apt."></el-input>
            </el-row>
        </el-row>


        <el-row v-show="step === 3">
            <el-row>
            <p class="text">
                Cunoscând prevederile articolului 326, referitoare la falsul în declarații precum și ale art. 352 referitoare la zădărnicirea combaterii bolilor din Noul Cod Penal, declar pe proprie răspundere faptul că mă deplasez în interes
            </p>
            </el-row>
            <el-row class="descendants">
                <el-radio v-model="form.interest" label="1" border>Personal</el-radio>
                <el-radio v-model="form.interest" label="2" border>Profesional</el-radio>
            </el-row>
            <el-row>
            <p class="text">intre orele</p>
            </el-row>
            <el-row class="split">
            <el-time-select placeholder="inceput" v-model="form.startTime" :picker-options="{ start: '00:00', step: '00:15', end: '23:59'}"></el-time-select>
            <el-time-select
                placeholder="sfarsit"
                v-model="form.endTime"
                :picker-options="{start: '00:00', step: '00:15', end: '23:59',minTime: form.startTime
                }">
            </el-time-select>
            </el-row>
            <el-input v-model="form.from" placeholder="adresa">
            <template slot="prepend">de la</template>
            </el-input>
            <el-input v-model="form.to" placeholder="adresa">
            <template slot="prepend">la</template>
            </el-input>
            <el-row>
            <p class="text">pentru</p>
            </el-row>
            <el-checkbox-group v-model="form.reasons">
            <el-checkbox v-for="(value, name) in reasons" :key="`reason-${name}`" :label="value" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-row>
    </el-form>

    <portal to="drawer">
      <Declaration v-if="isCreated" @close="isCreated = false" v-bind="{ form }"/>
    </portal>

    <p class="text simple">* Informatiile din formular sunt salvate doar in browser</p>
    <p class="text simple">* Aplicatia nu colecteaza niciun fel de date personale</p>
    <p class="text simple">* Utilizand aceasta aplicatie, fiecare utilizator isi asuma responsabilatea pentru corectitudinea, integralitatea și actualitatea informațiilor furnizate.</p>
</main>
<footer>
    <el-button :type="step === buttonLabels.length ? 'success' : 'primary'" @click="step < buttonLabels.length ? step++ : onFormSave()">{{ buttonLabels[step-1] }}</el-button>
</footer>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import Logo from '@/components/Logo';
import Declaration from '@/components/Declaration';

@Component({
    components: {
        Logo,
        Declaration
    }
})

export default class Form extends Vue {
    public step: number = 1;
    public isCreated: boolean = false;

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

    public forms: any = [];

    public created() {
        // When the component gets created.
    }

    public mounted() {
        this.refreshForm();

        if (localStorage.getItem('forms')) {
            try {
                this.forms = JSON.parse(localStorage.getItem('forms') || '{}');
            } catch(e) {
                localStorage.removeItem('forms');
            }
        }
    }

    @Watch("$route.params.form")
    public onRouteParamsChange() {
        this.refreshForm();
    }

    public refreshForm() {
        if (this.$route.params.form) {
            this.form = this.$route.params.form;
        }
    }

    private addZero(i: any) {
        if (i < 10) {
            i = "0" + i;
        }

        return i;
    }

    public onFormSave() {
        // Save the signing date (now)
        let dateTime = new Date()
        this.form.signingDate = dateTime.getDay() + "/" + dateTime.getMonth() + "/" 
                    + dateTime.getFullYear() + " " + this.addZero(dateTime.getHours()) + ":" + this.addZero(dateTime.getMinutes())

        // Check if we've got a record for this person already
        let foundIndex = this.forms.findIndex((x: any) => x.cnp === this.form.cnp)

        if (foundIndex !== -1) {
            this.forms[foundIndex] = this.form;
        } else {
            this.forms.push(this.form)
        }

        // Store the new forms array in localstorage
        let parsed: string = JSON.stringify(this.forms)
        localStorage.setItem('forms', parsed)
        this.isCreated = true;
    }
}
</script>

<style lang="less" scoped>
.container {

    header {
        display: flex;
        flex-flow: column;
        width: 100%;
        box-sizing: border-box;
        padding: 0;
        
        .logo {
            margin: 0 auto;
        }

        p {
            text-align: center;
            padding: 0;
            margin: 0 0 10px;
            box-sizing: border-box;
            width: 100%;
            font-size: 18px;
        }
    }

    main {
        display: flex;
        flex-flow: column;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0;
        position: relative;
        z-index: 2;

        @media screen and (min-width: 900px) {
            min-height: unset;
            padding: 20px;
            margin: 0 auto;
            border: 1px solid rgba(0, 0, 0, .1);
            background: #fff;
            border-radius: 6px;
        }

        .el-steps {
            border-radius: 0;

            /deep/ .el-step {
              cursor: pointer;

              .el-step__main{
                .el-step__title {
                  @media screen and (max-width: 350px){
                    font-size: 12px!important;
                  }
                }
              }
            }
        }

        .el-form {
            width: 100%;
            padding: 16px;
            box-sizing: border-box;
            display: flex;
            flex-flow: column;

            .el-input:not(.el-date-editor) {
                margin: 0 0 16px;
                font-size: 18px;
                box-sizing: border-box;

                input {
                    padding: 25px;
                }

                @media screen and (max-width: 350px){
                  font-size: 12px;

                  input {
                    padding: 10px;
                  }
                }
            }

            .descendants {
                display: flex;
                flex-flow: row wrap;
                justify-content: center;

                .el-radio {
                    background: #fff;
                    flex-grow: 1;
                }
            }

            .split {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                margin: 0 0 20px;

                .el-input {
                    flex-grow: 1;
                    flex-basis: 45%;
                    margin: 0;

                    &:nth-of-type(1) {
                        margin-right: 10px
                    }

                    &:nth-of-type(2) {
                        margin-left: 10px
                    }
                }
            }

            .address-details {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;

                &:before { content: ''; display: none; }

                .el-input {
                width: 32%;
                }
            }

            .el-checkbox-group {
                background: #fff;

                .el-checkbox {
                white-space: pre-wrap;
                display: flex;
                margin-bottom: 30px;

                .el-checkbox__label {
                    font-size: 18px;
                    padding-left: 20px;
                }
                }
            }

            .el-divider {
              .el-divider__text {
                @media screen and (max-width: 350px){
                  font-size: 10px;
                }
              }
            }
        }

        .text {
            background: #fff;
            padding: 15px;
            font-size: 16px;
            box-sizing: border-box;

            &.simple {
            padding: 0 20px 5px;
            font-size: 14px;
            }
        }
    }

    footer {
        display: flex;
        flex-flow: row;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;

        @media screen and (min-width: 900px) {
            position: relative;
        }

        .el-button {
            width: 100%;
            font-size: 20px;
            padding: 20px 10px;

            @media screen and (min-width: 900px) {
                padding: 20px 30px;
            }

            @media screen and (max-width: 350px){
              font-size: 16px;
            }
        }
    }
}
</style>
