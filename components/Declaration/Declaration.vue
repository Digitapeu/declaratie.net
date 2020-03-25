<template>
     <Backdrop ref="drawer" @close="$emit('close')" :closeable="true" :fixed="false" :transition="{name: 'slide-up', mode: 'out-in', appear: true}">
            <Drawer 
                :closeable="true"
                secure="Formulare salvate" 
                :title="form.name" 
                :style="{height: '100%', maxWidth:'800px', maxHeight: 'unset'}"
                @close="$refs.drawer.$emit('closeRequest')" 
            >

            <content>
                <h1>Declarație pe proprie răspundere,</h1>
                <p>
                    Subsemnatul(a) <strong>[numele_complete]</strong>, fiul/fiica lui <strong>[mama]</strong> și al <strong>[tata]</strong>, domiciliat(ă) în Cluj-Napoca, județul/sectorul Cluj, strada Str. Lacrimioarelor nr. 7, număr 7, bloc T1, etaj 1, apartament 26, având CNP <strong>[cnp]</strong>, 
                    BI/CI seria <strong>[serie]</strong>, număr <strong>[numar]</strong>,
                </p>

                <p>
                    Locuind în fapt(1) în localitatea Cluj-Napoca, județul/sectorul Cluj, strada Str. Eftimie Murgu, număr 39, bloc [bloc], etaj [etaj], apartament [apt]
                </p>

                <p>
                    Cunoscând prevederile articolului 326, referitoare la falsul în declarații(2), precum si ale art. 352 referitoare la zădărnicirea combaterii bolilor din Noul Cod Penal, declar pe proprie răspundere faptul că mă deplasez în interes <strong>[profesional/personal]</strong>, intre orele <strong>[interval_orar]</strong>, de la <u>[adresa_de_plecare], până la [destinatie]</u>, pentru(3):
                </p>
                <ol type="a" class="activities">
                    <li>
                        deplasarea între domiciliu și locul de muncă, atunci când activitatea profesională este esențială și nu poate fi organizată sub formă de lucru la distanță sau deplasarea în interes prefesional care nu poate fi amânată;
                    </li>
                    <li>
                        consult medical de specialitate care nu poate fi amânat;
                    </li>
                    <li>
                        deplasare pentru cumpărături de primă necesitate la unități comerciale din zona de domiciliu;
                    </li>
                    <li class="unchecked">
                        deplasare pentru asigurarea asistenței pentru persoane în vârstă, vulnerabile sau pentru însoțirea copiilor;
                    </li>
                    <li class="unchecked">
                        deplasare scurtă, lângă domiciliu, pentru desfășurarea de activități fizice individuale, în aer liber, cu excluderea oricărei forme de activitate sportivă colectivă;
                    </li>
                    <li class="unchecked">
                        deplasare scurtă, lângă domiciliu, legată de nevoile animalelor de companie;
                    </li>
                    <li class="unchecked">
                        deplasare pentru rezolvarea următoarei situații urgente:
                    </li>
                </ol>
                <p>
                    Atât declar, susțin și semnez. <br/>
                    <strong>Data:</strong> [data_completarii] <br/>
                    <strong>Semnătura:</strong> [nume_prenume]
                </p>

                <ol class="disclaimer">
                    <li>Se declară situația în care persoana nu locuiește la domiciliul prevăzut în actul de identitate.</li>
                    <li>Declararea necorespunzătoare a adevărului, făcută unei persoane dintre cele prevăzute in art. 175 sau unei unități în care aceasta își desfășoară activitatea în vederea producerii unei consecințe juridice, pentru sine sau pentru altul, atunci când, potrivit legii ori împrejurarilor, declarația făcută servește la producerea acelei consecințe, se depedpește de la 3 luni la 2 ani sau cu amendă.</li>
                    <li>Se completează motivul/cauzele deplasării.</li>
                </ol>
            </content>

            <template #footer>
                <el-row id="buttons">
                    <el-button type="primary" plain @click>Print</el-button>
                    <el-button type="warning" plain @click>Pdf</el-button>
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
        font-size: 20px;
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