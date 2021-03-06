<template>
     <Backdrop ref="drawer" @close="$emit('close')" :style="{'zIndex': '200'}" 
     :closeable="true" :fixed="false" :transition="{name: 'slide-up', mode: 'out-in', appear: true}">
            <Drawer 
                :closeable="true"
                secure="Formulare salvate" 
                :title="(form.name ? form.name + ' ' + form.surname : form.employee.name + ' ' + form.employee.surname)" 
                :style="{height: '100%', maxWidth:'800px', maxHeight: 'unset'}"
                @close="$refs.drawer.$emit('closeRequest')" 
            >

            <content>
                <div id="capture" v-if="form.type === 'employer'">
                    <h1>Adeverință angajator</h1>
                    <p>
                        Subsemnatul (nume, prenume), <strong>{{ form.employer.name }} {{ form.employer.surname }}</strong>, în calitate de
                        (funcția) <strong>{{ form.employer.position }}</strong> în cadrul (organizația) <strong>{{ form.employer.company }}</strong> confirm faptul că deplasarea persoanei menționată
                        mai jos, între domiciliu și locul său de muncă, este esențială pentru activitatea organizației și nu poate
                        fi organizată sub formă de telemuncă. 
                    </p>

                    <p>
                        Datele persoanei care se deplasează: 
                    </p>
                    <ul class="activities">
                        <li>
                            <strong>Nume:</strong> {{ form.employee.name }}
                        </li>
                        <li>
                            <strong>Prenume:</strong> {{ form.employee.surname }}
                        </li>
                        <li>
                            <strong>Data nașterii:</strong> {{ form.employee.day + ' ' + form.employee.month + ' ' + form.employee.year }}
                        </li>
                        <li>
                            <strong>Adresa:</strong> {{ form.employee.address.city }}, județul/sectorul {{ form.employee.address.county }},
                            strada {{ form.employee.address.street }}, bloc {{ form.employee.address.flat }}, etaj {{ form.employee.address.floor }}, apartament {{ form.employee.address.appartment }}
                        </li>
                        <li>
                            <strong>Domeniul activității profesionale:</strong> {{ form.employee.domain }}
                        </li>
                        <li>
                            <strong>Locul de desfășurare al activității profesionale:</strong> {{ form.employee.workAddress.city }}, județul/sectorul {{ form.employee.workAddress.county }},
                            strada {{ form.employee.workAddress.street }}, bloc {{ form.employee.workAddress.flat }}, etaj {{ form.employee.workAddress.floor }}, apartament {{ form.employee.workAddress.appartment }}
                        </li>
                        <li>
                            <strong>Traseul deplasării:</strong> {{ form.employee.route }}
                        </li>
                        <li>
                            <strong>Mijlocul de deplasare:</strong> {{ form.employee.transport }}
                        </li>
                    </ul>
                    <p>Subsemnatul cunosc prevederile art. 326 din Codul Penal cu privire la falsul în declarații și art. 352 din
                    Codul Penal cu privire la zădărnicirea combaterii bolilor. </p>
                    <p>
                        Atât declar, susțin și semnez. <br/>
                        <strong>Perioada:</strong> {{ form.startTime }} - {{ form.endTime }} <br/>
                        <strong>Semnătura:</strong> {{ form.employer.name }} {{ form.employer.surname }}
                    </p>
                    <p></p>
                    <ol class="disclaimer">
                        <li>Se va menționa de către angajator numai perioada/intervalul de timp necesar desfășurării activității de
                        către angajat, pentru care este justificată deplasarea (ex: perioada decretată pentru starea de urgență sau
                        mai scurtă), aceasta fiind perioada pentru care este valabilă adeverința.</li>
                    </ol>
                </div>

                <div id="capture" v-else>
                    <h1>Declarație pe proprie răspundere,</h1>
                    <p>
                        Subsemnatul(a) <strong>{{ form.name }} {{ form.surname }}</strong>, născut pe data de 
                        <strong>{{ form.day + ' '+ form.month + ' ' + form.year }}</strong>, 
                        domiciliat(ă) în <strong>{{ form.address.city }}</strong>, județul/sectorul <strong>{{ form.address.county }}</strong>, 
                        strada <strong>{{ form.address.street }}</strong>, <span v-if="form.address.flat">bloc {{ form.address.flat }},</span> 
                        <span v-if="form.address.floor">etaj {{ form.address.floor }},</span> 
                        <span v-if="form.address.appartment">apartament {{ form.address.appartment }},</span>
                    </p>

                    <p>
                        Cunoscând prevederile articolului 326, referitoare la falsul în declarații(2), precum si ale art. 352 referitoare la zădărnicirea combaterii bolilor din Noul Cod Penal, 
                        declar pe proprie răspundere faptul că mă deplasez în interes <strong>{{ form.interest == '1' ? 'personal' : 'profesional' }}</strong>, intre orele <strong>{{ form.startTime }} - {{ form.endTime }}</strong>, 
                        de la <u>{{ form.from }}, până la {{ form.to }}</u>, pentru:
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
            </content>

            <template #footer>
                <el-row id="buttons">
                    <el-button type="primary" @click="onDocumentPrint()" plain>Print</el-button>
                    <el-button type="warning" @click="onDocumentSave()" plain>Pdf</el-button>
                    
                    <nuxt-link v-if="$route.name != 'form' && $route.name != 'form-employer' && form.type != 'employer'" class="el-button el-button--success is-plain" :to="{name: 'form', params: { form: form }}" tag="button"><span @click="$refs.drawer.$emit('closeRequest')">Duplica</span></nuxt-link>
                    <nuxt-link v-else-if="$route.name != 'form' && $route.name != 'form-employer' && form.type == 'employer'" class="el-button el-button--success is-plain" :to="{name: 'form-employer', params: { form: form }}" tag="button"><span @click="$refs.drawer.$emit('closeRequest')">Duplica</span></nuxt-link>
                    <nuxt-link v-else class="el-button el-button--success is-plain" :to="{path: '/'}" tag="button"><span @click="$refs.drawer.$emit('closeRequest')">Restart</span></nuxt-link>
                    
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

            @media screen and (max-width: 375px){
                font-size: 16px;
            }

            @media screen and (max-width: 320px){
                font-size: 12px;
            }
        }

        span {
            margin-left: 10px;
        }
    }
</style>