<template>
<div class="container">
    <div id="hashtag">#stamacasa</div>
    <Logo />
    <p>Completeaza usor si rapid <br />declaratia pe proprie raspundere ( <strong>obligatorie</strong> ) <br />conform ordonantei militare nr. 3</p>

    <el-row>
        <nuxt-link class="el-button el-button--primary" :to="{path: '/form'}">Completeaza formularul</nuxt-link>
        <nuxt-link class="el-button el-button--primary" :to="{path: '/form-employer'}">Completeaza formularul angajatorului</nuxt-link>
        <el-button type="default" @click="showForm = true">Formulare salvate</el-button>
    </el-row>

    <el-row id="sharer" @click.native="share()" style="cursor: pointer">
        <ShareIcon />
        Trimite la familie si prieteni
    </el-row>

    <Backdrop v-if="showForm" ref="drawer" @close="showForm = false" :closeable="true" :fixed="false" :transition="{name: 'slide-up', mode: 'out-in', appear: true}">
        <Drawer :closeable="true" secure="Formulare salvate" title="Selecteaza o declaratie" @close="$refs.drawer.$emit('closeRequest')">

            <ul v-if="getForms().length" class="forms">
                <li v-for="(entry,index) in getForms()" :key="`form-${index}`">
                    <el-button v-if="entry.name && entry.surname" type="default" @click="form = entry">
                        {{ entry.name }} {{ entry.surname }}
                        <span class="date">{{ entry.signingDate}}</span>
                    </el-button>
                    <template v-if="entry.employee">
                        <el-button v-if="entry.employee.name && entry.employee.surname" type="default" @click="form = entry">
                            {{ entry.employee.name }} {{ entry.employee.surname }}
                            <span class="date">{{ entry.signingDate}}</span>
                        </el-button>
                    </template>
                </li>
            </ul>
            <p v-else>
                Inca nu ai nicio declaratie completata
            </p>

        </Drawer>
    </Backdrop>

    <portal to="drawer">
        <Declaration v-if="form.signingDate" @close="form = {}" v-bind="{ form }" />
    </portal>
</div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Prop
} from 'vue-property-decorator';

import Logo from '@/components/Logo';
import Drawer from '@/components/Drawer';
import Backdrop from '@/components/Backdrop';
import Declaration from '@/components/Declaration';
import ShareIcon from '@/assets/svg/share.svg?inline';

@Component({
    name: 'home',
    components: {
        Logo,
        Drawer,
        Backdrop,
        Declaration,
        ShareIcon
    }
})

export default class Index extends Vue {
    public showForm: boolean = false;

    public form: any = {};

    public created() {
        // When the component gets created.
    }

    public mounted() {
        
    }

    public getForms() {
        if (localStorage.getItem('forms')) {
            try {
                let forms = JSON.parse(localStorage.getItem('forms') || '{}');

                return forms
            } catch (e) {
                localStorage.removeItem('forms');
            }
        }

        return []
    }

    public async share() {
        console.log('Started sharing...');

        type ShareData = {
            title?: string;
            text?: string;
            url?: string;
        };

        // extending window.navigator, which has a type of Navigator
        interface SharableNavigator extends Navigator {
            share: (data?: ShareData) => Promise<void>;
        }

        function isSharableNavigator(nav: Navigator): nav is SharableNavigator {
            return typeof (nav as SharableNavigator).share === 'function';
        }

        if (isSharableNavigator(window.navigator)) {
            try {
                await window.navigator.share({ // no error
                    title: `Declaratia pe raspundere proprie pentru deplasari - declaratie.net`,
                    text: `Completeaza-ti online declaratia. Merge foarte bine pe mobil`,
                    url: `${window.location.origin}${this.$route.path}?utm_source=share`,
                });
            } catch (e) {}
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;

    #hashtag {
        font-size: 30px;
        font-weight: bold;
        color: red;
        transform: translate3D(0, 45deg, 0);

        @media screen and (max-width: 400px) {
            font-size: 18px;
        }
    }

    @media screen and (min-width: 990px) {
        background-color: unset;
    }

    p {
        text-align: center;
        width: 100%;
        padding: 5px;
        box-sizing: border-box;

        @media screen and (max-width: 350px) {
            font-size: 12px;
        }
    }

    .el-row {
        width: 100%;
        display: flex;
        flex-flow: column;
        margin: 30px auto;
        align-items: center;

        @media screen and (max-width: 400px) {
            margin: 20px auto 0 auto;
        }
    }

    .el-button {
        width: 90%;
        font-size: 14px;
        text-decoration: none;
        margin: 5px auto;
        padding: 20px 0;

        .date {
            font-weight: bold;
        }

        @media screen and (max-width: 350px) {
            font-size: 12px;
            width: 90%;
            margin: 5px;
            padding: 15px;
        }
    }

    .forms {
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            width: 100%;

            .el-button {
                width: 100%;
                margin: 0 0 20px;
            }
        }
    }

    #sharer {
        display: none;

        @media screen and (max-width: 600px) {
            display: flex;
            flex-flow: column;
            align-items: center;
            width: 80%;
            height: auto;
            margin: 0 auto;

            svg {
                width: 45px;
                height: 45px;
                margin: 20px auto;
                cursor: pointer;
            }
        }

         @media screen and (max-width: 350px) {
             svg {
                width: 30px;
                height: 30px;
                margin: 15px auto;
                cursor: pointer;
            }
         }
    }
}
</style>
