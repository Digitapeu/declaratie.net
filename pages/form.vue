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

        <el-form v-show="step === 1" ref="form1" :model="form" :rules="rules[0]">
            <el-row>

                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder="Nume"></el-input>
                </el-form-item>

                <el-form-item prop="surname">
                    <el-input v-model="form.surname" placeholder="Prenume"></el-input>
                </el-form-item>

                <el-divider>data nasterii</el-divider>

                <el-row class="date">
                    <!-- <el-form-item prop="birthDate">
                      <el-date-picker v-model="form.birthDate" format="dd-MM-yyyy" value-format="dd-MM-yyyy" type="date" placeholder="Data nasterii"></el-date-picker>
                  </el-form-item> -->
                    <el-form-item prop="day">
                        <el-select v-model="form.day" placeholder="Ziua">
                            <el-option v-for="(item,index) in days" :key="`day-${index}`" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="month">
                        <el-select v-model="form.month" placeholder="Luna">
                            <el-option v-for="(item,index) in months" :key="`month-${index}`" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="year">
                        <el-select v-model="form.year" placeholder="Anul">
                            <el-option v-for="(item,index) in years" :key="`year-${index}`" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                </el-row>

            </el-row>
        </el-form>

        <el-form v-show="step === 2" ref="form2" :model="form" :rules="rules[1]">
            <el-row>
                <el-divider content-position="center">Domiciliul curent</el-divider>

                <el-form-item prop="address.city">
                    <el-input v-model="form.address.city" placeholder="Oras"></el-input>
                </el-form-item>

                <el-form-item prop="address.county">
                    <el-input v-model="form.address.county" placeholder="Judet/Sector"></el-input>
                </el-form-item>

                <el-form-item prop="address.street">
                    <el-input v-model="form.address.street" placeholder="Strada, Numar"></el-input>
                </el-form-item>

                <el-row class="address-details">
                    <el-input v-model="form.address.flat" placeholder="Bloc"></el-input>
                    <el-input v-model="form.address.floor" placeholder="Etaj"></el-input>
                    <el-input v-model="form.address.appartment" placeholder="Apt."></el-input>
                </el-row>

            </el-row>
        </el-form>

        <el-form v-show="step === 3" ref="form3" :model="form" :rules="rules[2]">
            <el-row>
                <el-row>
                    <p class="text">
                        Cunoscând prevederile articolului 326, referitoare la falsul în declarații precum și ale art. 352 referitoare la zădărnicirea combaterii bolilor din Noul Cod Penal, declar pe proprie răspundere faptul că mă deplasez în interes
                    </p>
                </el-row>
                <el-row class="descendants">
                    <el-form-item prop="interest">
                        <el-radio v-model="form.interest" label="1" border>Personal</el-radio>
                        <el-radio v-model="form.interest" label="2" border>Profesional</el-radio>
                    </el-form-item>
                </el-row>
                <el-row>
                    <p class="text">intre orele</p>
                </el-row>
                <el-row class="split">
                    <el-form-item prop="startTime">
                        <el-time-select placeholder="inceput" v-model="form.startTime" :picker-options="{ start: '06:00', step: '00:15', end: '23:59'}"></el-time-select>
                    </el-form-item>

                    <el-form-item prop="endTime">
                        <el-time-select placeholder="sfarsit" v-model="form.endTime" :picker-options="{start: '06:00', step: '00:15', end: '23:59',minTime: form.startTime
                  }"></el-time-select>
                    </el-form-item>
                </el-row>

                <el-form-item prop="from">
                    <el-input v-model="form.from" placeholder="adresa">
                        <template slot="prepend">de la</template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="to">
                    <el-input v-model="form.to" placeholder="adresa">
                        <template slot="prepend">la</template>
                    </el-input>
                </el-form-item>

                <el-row>
                    <p class="text">pentru</p>
                </el-row>

                <el-form-item prop="reasons">
                    <el-checkbox-group v-model="form.reasons">
                        <el-checkbox v-for="(value, name) in reasons" :key="`reason-${name}`" :label="value" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-row>
        </el-form>

        <portal to="drawer">
            <Declaration v-if="isCreated" @close="isCreated = false" v-bind="{ form }" />
        </portal>

        <p class="text simple">* Informatiile din formular sunt salvate doar in browser</p>
        <p class="text simple">* Aplicatia nu colecteaza niciun fel de date personale</p>
        <p class="text simple">* Utilizand aceasta aplicatie, fiecare utilizator isi asuma responsabilatea pentru corectitudinea, integralitatea și actualitatea informațiilor furnizate.</p>
    </main>
    <footer>
        <el-button :type="step === buttonLabels.length ? 'success' : 'primary'" @click="advance()">{{ buttonLabels[step-1] }}</el-button>
    </footer>
</div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    Watch
} from 'vue-property-decorator';

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
        work: 'interes profesional, inclusiv între locuință/gospodărie și locul/locurile de desfășurare a activității profesionale și înapoi',
        consult: 'asistență medicală care nu poate fi amânată și nici realizată de la distanță',
        shopping: 'asigurarea de bunuri care acoperă necesitățile de bază ale persoanelor și animalelor de companie/domestice',
        medicalCare: 'motive justificate, precum îngrijirea/ însoțirea unui minor/copilului, asistența persoanelor vârstnice, bolnave sau cu dizabilități ori deces al unui membru de familie',
        shortBreak: 'activitate fizică individuală (cu excluderea oricăror activități sportive de echipă/ colective) sau pentru nevoile animalelor de companie/domestice, în apropierea locuinței',
        agriculture: 'realizarea de activități agricole',
        blood: 'donarea de sânge, la centrele de transfuzie sanguină',
        volunteer: 'scopuri umanitare sau de voluntariat',
        commerce: 'comercializarea de produse agroalimentare (în cazul producătorilor agricoli)',
        goods: 'asigurarea de bunuri necesare desfășurării activității profesionale.'
    };

    public days: any = Array.from(Array(31).keys()).map(index => index + 1);
    public months: any = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public years: any = Array.from(Array(102).keys()).map(index => 1900 + index + 1);

    public rules: any = [{
            name: [{
                required: true,
                message: 'Te rugam sa-ti introduci numele de familie',
                trigger: 'blur'
            }, ],
            surname: [{
                required: true,
                message: 'Te rugam sa-ti introduci prenumele',
                trigger: 'blur'
            }, ],
            day: [{
                required: true,
                message: 'Camp obligatoriu',
                trigger: 'blur'
            }],
            month: [{
                required: true,
                message: 'Camp obligatoriu',
                trigger: 'blur'
            }],
            year: [{
                required: true,
                message: 'Camp obligatoriu',
                trigger: 'blur'
            }]
        },
        {
            address: {
                city: [{
                    required: true,
                    message: 'Te rugam sa completezi orasul',
                    trigger: 'blur'
                }, ],
                county: [{
                    required: true,
                    message: 'Te rugam sa completezi judetul/sectorul',
                    trigger: 'blur'
                }, ],
                street: [{
                    required: true,
                    message: 'Te rugam sa completezi strada',
                    trigger: 'blur'
                }, ],
                number: [{
                    required: true,
                    message: 'Te rugam sa completezi numarul adresei',
                    trigger: 'blur'
                }, ],
            },
        },
        {
            interest: [{
                required: true,
                message: 'Ce tip de deplasare faci?',
                trigger: 'blur'
            }, ],
            startTime: [{
                required: true,
                message: 'Ora de plecare',
                trigger: 'blur'
            }, ],
            endTime: [{
                required: true,
                message: 'Ora de intoarcere',
                trigger: 'blur'
            }, ],
            from: [{
                required: true,
                message: 'Completeaza adresa de plecare',
                trigger: 'blur'
            }, ],
            to: [{
                required: true,
                message: 'Completeaza destinatia',
                trigger: 'blur'
            }, ],
            reasons: [{
                required: true,
                message: 'Selecteaza minim un motiv',
                trigger: 'blur'
            }, ],
        }
    ]

    public form: any = {
        type: 'normal',
        name: '',
        surname: '',
        day: '',
        month: '',
        year: '',
        address: {
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
        this.refreshForm();
    }

    //step < buttonLabels.length ? step++ : onFormSave()

    public advance() {
        let form: any = this.$refs[`form${this.step}`];

        form.validate((valid: any) => {
            if (valid) {
                if (this.step < this.buttonLabels.length) {
                    return this.step++;
                } else {
                    return this.onFormSave();
                }
            } else {
                alert('Te rugam sa completezi toate campurile obligatorii');
                return false;
            }
        });
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
        let dateTime = new Date();
        this.form.signingDate = dateTime.getUTCDate() + "/" + (dateTime.getMonth() + 1) + "/" +
            dateTime.getFullYear() + " " + this.addZero(dateTime.getHours()) + ":" + this.addZero(dateTime.getMinutes())

        // Get all the forms and add the new one
        let forms: any = []

        if (localStorage.getItem('forms')) {
            try {
                forms = JSON.parse(localStorage.getItem('forms') || '{}');
            } catch (e) {
                localStorage.removeItem('forms');
            }
        }

        forms.push(this.form)

        // Store the new forms array in localstorage
        let parsed: string = JSON.stringify(forms)
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

                .el-step__main {
                    .el-step__title {
                        @media screen and (max-width: 350px) {
                            font-size: 12px !important;
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
                margin: 0;
                font-size: 18px;
                box-sizing: border-box;

                input {
                    padding: 25px;
                }

                @media screen and (max-width: 350px) {
                    font-size: 12px;

                    input {
                        padding: 10px;
                    }
                }
            }

            .el-date-editor {
                width: 100%;
            }

            .descendants {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;

                .el-form-item {
                    width: 100%;
                    margin: 0;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;

                    &:before,
                    &:after {
                        content: unset;
                    }

                    /deep/ .el-form-item__content {
                        width: 100%;
                        display: flex;
                        flex-flow: row wrap;
                        justify-content: space-between;

                        &:before,
                        &:after {
                            content: unset;
                        }
                    }
                }

                &:before,
                &:after {
                    content: unset;
                }

                .el-radio {
                    background: #fff;
                    width: 47%;
                    margin: 0;
                }
            }

            .address-details {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;

                &:before {
                    content: '';
                    display: none;
                }

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

            .date {
                display: flex;
                flex-flow: row;
                justify-content: space-between;

                &:before,
                &:after {
                    content: unset;
                }

                .el-form-item {
                    width: 30%;
                }
            }

            .el-divider {
                .el-divider__text {
                    @media screen and (max-width: 350px) {
                        font-size: 10px;
                    }
                }
            }
        }

        .split {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            margin: 0 0 20px;

            &:before,
            &:after {
                content: unset;
            }

            .el-input {
                flex-grow: 1;
                width: 45%;
                margin: 0;

                &:nth-of-type(1) {
                    margin-right: 10px
                }

                &:nth-of-type(2) {
                    margin-left: 10px
                }
            }

            .el-form-item {
                width: 47%;
                margin: 0;
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;

                &:before,
                &:after {
                    content: unset;
                }

                /deep/ .el-form-item__content {
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;

                    &:before,
                    &:after {
                        content: unset;
                    }

                    .el-input {
                        margin: 0;
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

            @media screen and (max-width: 350px) {
                font-size: 16px;
            }
        }
    }
}
</style>
