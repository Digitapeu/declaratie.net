<template>
    <div class="container">
        <div id="hashtag">#stamacasa</div>
        <Logo />
        <p>Completeaza usor si rapid <br/>declaratia pe proprie raspundere ( <strong>obligatorie</strong> ) <br/>conform ordonantei militare nr. 3</p>
        
        <el-row>
            <nuxt-link class="el-button el-button--primary" :to="{path: '/form'}">Completeaza formularul</nuxt-link>
            <el-button type="default" @click="showForm = true">Formulare salvate</el-button>
        </el-row>

        <el-row id="sharer" @click.native="share" style="cursor: pointer">
            <ShareIcon/>
            Trimite la familie si prieteni
        </el-row>

        
        <Backdrop v-if="showForm" ref="drawer" @close="showForm = false" :closeable="true" :fixed="false" :transition="{name: 'slide-up', mode: 'out-in', appear: true}">
            <Drawer 
                :closeable="true"
                secure="Formulare salvate" 
                title="Click pe nume" 
                @close="$refs.drawer.$emit('closeRequest')" 
            >
                
                <ul class="forms">
                    <li v-for="(entry,index) in forms" :key="`form-${index}`">
                        <el-button v-if="entry.name && entry.surname" type="default" @click="form = entry">{{ entry.name }} {{ entry.surname }}</el-button>
                    </li>
                </ul>

            </Drawer>
        </Backdrop>

        <Declaration v-if="form.id" @close="form = {}" v-bind="{ form }"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

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
  },
  methods: {
      share(){
        let navigator: any

        console.log('Started sharing...');
        if (window.navigator && window.navigator.share !== undefined) {
            navigator.share({
                title: `Declaratia pe raspundere proprie pentru deplasari - declaratie.net`,
                text: `Completeaza-ti online declaratia. Merge foarte bine pe mobil`,
                url: `${window.location.origin}${this.$route.path}?utm_source=share`,
            })
            .then(() => {
                console.log('Successful share');
            })
            .catch((error: any) => {
                console.log({...error});
            });
        }
    }
  }
})

export default class Index extends Vue {
    public showForm: boolean = false;

    public form: any = {};

    public forms: any = [];

    public created() {
        // When the component gets created.
    }

    public mounted() {
        if (localStorage.getItem('forms')) {
            try {
                this.forms = JSON.parse(localStorage.getItem('forms') || '{}');
            } catch(e) {
                localStorage.removeItem('forms');
            }
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
        position: absolute;
        top: 20px;
        font-size: 30px;
        font-weight: bold;
        color: red;
        transform: translate3D(0, 45deg, 0);
    }

    @media screen and (min-width: 990px){
        background-color: unset;
    }

    p { 
        text-align: center; width: 100%; padding: 10px; box-sizing: border-box;

        @media screen and (max-width: 350px){
            font-size: 12px;
        }
    }

    .el-row {
        width: 100%;
        display: flex;
        flex-flow: column;
        margin: 30px auto;
        align-items: center;

        @media screen and (max-width: 350px){
            margin: 0 auto;
        }
    }

    .el-button {
        width: 90%;
        font-size: 22px;
        text-decoration: none;
        margin: 10px auto;
        padding: 20px 0;

        @media screen and (max-width: 350px){
            font-size: 18px;
            width: 90%;
            margin: 5px;
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

        @media screen and (max-width: 600px){
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
    }
}
</style>