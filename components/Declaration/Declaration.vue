<template>
     <Backdrop ref="drawer" @close="$emit('close')" :closeable="true" :fixed="false" :transition="{name: 'slide-up', mode: 'out-in', appear: true}">
            <Drawer 
                :closeable="true"
                secure="Formulare salvate" 
                :title="form.name + ' ' + form.surname" 
                :style="{height: '100%', maxWidth:'800px', maxHeight: 'unset'}"
                @close="$refs.drawer.$emit('closeRequest')" 
            >

            <content>
                <div id="capture">
                    <h1>Declarație pe proprie răspundere,</h1>
                    <p>
                        Subsemnatul(a) <strong>{{ form.name }} {{ form.surname }}</strong>, {{ form.descendant == '1' ? 'fiica' : 'fiul' }} lui <strong>{{ form.father }}</strong> și al lui <strong>{{ form.mother }}</strong>, 
                        domiciliat(ă) în {{ form.address.city }}, județul/sectorul {{ form.address.county }}, 
                        strada {{ form.address.street }}, <span v-if="form.address.flat">bloc {{ form.address.flat }},</span> 
                        <span v-if="form.address.floor">etaj {{ form.address.floor }},</span> 
                        <span v-if="form.address.appartment">apartament {{ form.address.appartment }},</span> având CNP <strong>{{ form.cnp }}</strong>, 
                        BI/CI seria <strong>{{ form.id.series }}</strong>, număr <strong>{{ form.id.number }}</strong>,
                    </p>

                    <p>
                        Locuind în fapt(1) în localitatea {{ form.residence.city }}, județul/sectorul {{ form.residence.county }}, strada {{ form.residence.street }}, 
                        <span v-if="form.residence.flat">bloc {{ form.residence.flat }},</span> 
                        <span v-if="form.residence.floor">etaj {{ form.residence.floor }},</span> 
                        <span v-if="form.residence.appartment">apartament {{ form.residence.appartment }},</span>
                    </p>

                    <p>
                        Cunoscând prevederile articolului 326, referitoare la falsul în declarații(2), precum si ale art. 352 referitoare la zădărnicirea combaterii bolilor din Noul Cod Penal, 
                        declar pe proprie răspundere faptul că mă deplasez în interes <strong>{{ form.interest == '1' ? 'personal' : 'profesional' }}</strong>, intre orele <strong>{{ form.startTime }} - {{ form.endTime }}</strong>, 
                        de la <u>{{ form.from }}, până la {{ form.to }}</u>, pentru(3):
                    </p>
                    <ol type="a" class="activities">
                        <li v-for="reason in form.reasons" v-bind:key="reason">
                            {{ reason }}
                        </li>
                    </ol>
                    <p></p>
                    <p>
                        Atât declar, susțin și semnez. <br/>
                        <strong>Data:</strong> {{ form.signingDate }} <br/>
                        <strong>Semnătura:</strong> {{ form.name }} {{ form.surname }}
                    </p>
                    <p></p>
                    <ol class="disclaimer">
                        <li>Se declară situația în care persoana nu locuiește la domiciliul prevăzut în actul de identitate.</li>
                        <li>Declararea necorespunzătoare a adevărului, făcută unei persoane dintre cele prevăzute in art. 175 sau unei unități în care aceasta își desfășoară activitatea în vederea producerii unei consecințe juridice, pentru sine sau pentru altul, atunci când, potrivit legii ori împrejurarilor, declarația făcută servește la producerea acelei consecințe, se depedpește de la 3 luni la 2 ani sau cu amendă.</li>
                        <li>Se completează motivul/cauzele deplasării.</li>
                    </ol>
                </div>

            <template #footer>
                <el-row id="buttons">
                    <el-button type="primary" @click="onDocumentPrint()">Print</el-button>
                    <el-button type="warning" @click="onDocumentSave()">Salveaza .pdf</el-button>
                    <el-button type="success" plain @click>Duplica</el-button>
                </el-row>
            </template>

            </Drawer>
     </Backdrop>
</template>

<style lang="less" scoped>
content {
    padding: 0 0 100px;
    box-sizing: border-box;

    h1 {
        font-size: 24px;
        width: 100%;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    }

    p {
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        font-size: 16px;
        text-align: justify;
    }

    ol.activities {
        border: 1px solid #000;
        padding: 20px 40px;

        li { margin: 0 0 10px; }
        li.unchecked {
            color: #ccc;
            text-decoration: line-through;
            list-style: none;
        }
    }

    ol.disclaimer {
        li {
            font-size: 12px;
        }
    }
}

#buttons {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 30;
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;

        @media screen and (min-width: 990px){
            position: absolute;
        }
        
        .el-button {
            font-size: 20px;
        }
    }
</style>