<template>
    <div class="container">
        <Logo />
        <p>Completeaza usor si rapid <br/>declaratia pe proprie raspundere ( <strong>obligatorie</strong> ) <br/>conform ordonantei militare nr. 3</p>
        
        <el-row>
            <nuxt-link class="el-button el-button--primary" :to="{path: '/form'}">Completeaza formularul</nuxt-link>
            <el-button type="default" @click="showForm = true">Formulare salvate</el-button>
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
                        <el-button type="default" @click="form = entry">{{ entry.name }}</el-button>
                    </li>
                </ul>

            </Drawer>
        </Backdrop>

        <Declaration v-if="form.id" @close="form = {}" v-bind="{ form }"/>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Logo from '@/components/Logo.vue';
import Drawer from '@/components/Drawer';
import Backdrop from '@/components/Backdrop';
import Declaration from '@/components/Declaration';

@Component({
  name: 'home',
  components: {
    Logo,
    Drawer,
    Backdrop,
    Declaration
  },
})
export default class Index extends Vue {
  public showForm: boolean = false;

  public form: any = {};

  public forms: any = [
        {id: 1, name: 'Dorel Purcel'},
        {id: 2, name: 'Mircea Cel Batran'}
    ];
}
</script>

<style lang="less" scoped>
.container {
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;

    p { text-align: center; width: 100%; padding: 10px; box-sizing: border-box;}

    .el-row {
        width: 100%;
        display: flex;
        flex-flow: column;
        margin: 30px auto;
        align-items: center;
    }

    .el-button {
        width: 80%;
        font-size: 24px;
        text-decoration: none;
        margin: 15px auto;
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
}
</style>