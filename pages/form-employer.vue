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

                <el-form-item prop="employer.name">
                    <el-input v-model="form.employer.name" placeholder="Nume"></el-input>
                </el-form-item>

                <el-form-item prop="employer.surname">
                    <el-input v-model="form.employer.surname" placeholder="Prenume"></el-input>
                </el-form-item>
                
                <el-form-item prop="employer.position">
                    <el-input v-model="form.employer.position" placeholder="Functia"></el-input>
                </el-form-item>

                <el-form-item prop="employer.company">
                    <el-input v-model="form.employer.company" placeholder="Compania"></el-input>
                </el-form-item>

            </el-row>
        </el-form>

        <el-form v-show="step === 2" ref="form2" :model="form" :rules="rules[1]">
            <el-row>
                <el-divider content-position="center">Informatii Angajat</el-divider>
                <el-form-item prop="employee.name">
                    <el-input v-model="form.employee.name" placeholder="Nume"></el-input>
                </el-form-item>

                <el-form-item prop="employee.surname">
                    <el-input v-model="form.employee.surname" placeholder="Prenume"></el-input>
                </el-form-item>

                <el-row class="date">
                    <el-form-item prop="employee.day">
                        <el-select v-model="form.employee.day" placeholder="Ziua">
                            <el-option v-for="(item,index) in days" :key="`day-${index}`" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="employee.month">
                        <el-select v-model="form.employee.month" placeholder="Luna">
                            <el-option v-for="(item,index) in months" :key="`month-${index}`" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="employee.year">
                        <el-select v-model="form.employee.year" placeholder="Anul">
                            <el-option v-for="(item,index) in years" :key="`year-${index}`" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>

                </el-row>

                
                <el-divider content-position="center">Domiciliul curent</el-divider>

                <el-form-item prop="employee.address.city">
                    <el-input v-model="form.employee.address.city" placeholder="Oras"></el-input>
                </el-form-item>

                <el-form-item prop="employee.address.county">
                    <el-input v-model="form.employee.address.county" placeholder="Judet/Sector"></el-input>
                </el-form-item>

                <el-form-item prop="employee.address.street">
                    <el-input v-model="form.employee.address.street" placeholder="Strada, Numar"></el-input>
                </el-form-item>

                <el-row class="address-details">
                    <el-input v-model="form.employee.address.flat" placeholder="Bloc"></el-input>
                    <el-input v-model="form.employee.address.floor" placeholder="Etaj"></el-input>
                    <el-input v-model="form.employee.address.appartment" placeholder="Apt."></el-input>
                </el-row>

            </el-row>
        </el-form>

        <el-form v-show="step === 3" ref="form3" :model="form" :rules="rules[2]">
            <el-row>
                <el-row>
                    <p class="text">
                        Cunoscând prevederile articolului 326, referitoare la falsul în declarații precum și ale art. 352 referitoare la zădărnicirea combaterii bolilor din Noul Cod Penal, declar pe proprie răspundere:
                    </p>
                </el-row>
                <el-form-item prop="employee.domain">
                    <el-input v-model="form.employee.domain" placeholder="Domeniul activității profesionale"></el-input>
                </el-form-item>

                <el-divider content-position="center">Activitatea se desfasoara la</el-divider>

                <el-form-item prop="employee.workAddress.city">
                    <el-input v-model="form.employee.workAddress.city" placeholder="Oras"></el-input>
                </el-form-item>

                <el-form-item prop="employee.workAddress.county">
                    <el-input v-model="form.employee.workAddress.county" placeholder="Judet/Sector"></el-input>
                </el-form-item>

                <el-form-item prop="employee.workAddress.street">
                    <el-input v-model="form.employee.workAddress.street" placeholder="Strada, Numar"></el-input>
                </el-form-item>

                <el-row class="address-details">
                    <el-input v-model="form.employee.workAddress.flat" placeholder="Bloc"></el-input>
                    <el-input v-model="form.employee.workAddress.floor" placeholder="Etaj"></el-input>
                    <el-input v-model="form.employee.workAddress.appartment" placeholder="Apt."></el-input>
                </el-row>

                <br/>

                <el-form-item prop="employee.route">
                    <el-input v-model="form.employee.route" placeholder="Traseul deplasării"></el-input>
                </el-form-item>

                <el-form-item prop="employee.transport">
                    <el-input v-model="form.employee.transport" placeholder="Mijlocul de deplasare"></el-input>
                </el-form-item>

                <el-row>
                    <p class="text">perioada</p>
                </el-row>
                <el-row class="split">
                    <el-form-item prop="startTime">
                        <el-date-picker v-model="form.startTime" format="dd-MM-yyyy" value-format="dd-MM-yyyy" type="date" placeholder="inceput"></el-date-picker>
                    </el-form-item>

                    <el-form-item prop="endTime">
                        <el-date-picker v-model="form.endTime" format="dd-MM-yyyy" value-format="dd-MM-yyyy" type="date" placeholder="sfarsit"></el-date-picker>
                    </el-form-item>
                </el-row>

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
        'Urmatorul pas ( angajat )',
        'Ultimul pas ( detalii )',
        'Finalizeaza'
    ];

    public days: any = Array.from(Array(31).keys()).map(index => index + 1);
    public months: any = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public years: any = Array.from(Array(102).keys()).map(index => 1900 + index + 1);

    public rules: any = [{
            employer: {
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
                position: [{
                    required: true,
                    message: 'Te rugam sa-ti introduci functia in companie',
                    trigger: 'blur'
                }, ],
                company: [{
                    required: true,
                    message: 'Te rugam sa introduci numele companiei',
                    trigger: 'blur'
                }, ]
            }
        },
        {
            employee: {
                name: [{
                    required: true,
                    message: 'Te rugam sa-i introduci numele de familie',
                    trigger: 'blur'
                }, ],
                surname: [{
                    required: true,
                    message: 'Te rugam sa-i introduci prenumele',
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
                }],
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
            }
        },
        {
            employee: {
                domain: [{
                    required: true,
                    message: 'Te rugam sa introduci domeniul de activitate',
                    trigger: 'blur'
                }, ],
                route: [{
                    required: true,
                    message: 'Te rugam sa introduci ruta prestabilita',
                    trigger: 'blur'
                }, ],
                transport: [{
                    required: true,
                    message: 'Te rugam sa introduci mijlocul de transport',
                    trigger: 'blur'
                }, ],
                workAddress: {
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
            startTime: [{
                required: true,
                message: 'Data de inceput',
                trigger: 'blur'
            }, ],
            endTime: [{
                required: true,
                message: 'Data de sfarsit',
                trigger: 'blur'
            }, ],
        }
    ]

    public form: any = {
        type: 'employer',
        employer: {
            name: '',
            surname: '',
            position: '',
            company: ''
        },
        employee: {
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
            domain: '',
            workAddress: {
                city: '',
                county: '',
                street: '',
                number: '',
                flat: '',
                floor: '',
                appartment: ''
            },
            route: '',
            transport: ''
        },
        startTime: '',
        endTime: ''
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
            } catch (e) {
                localStorage.removeItem('forms');
            }
        }
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

        this.forms.push(this.form)

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

            .el-date-editor { width: 100%; }

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

            .el-divider {
                .el-divider__text {
                    @media screen and (max-width: 350px) {
                        font-size: 10px;
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
