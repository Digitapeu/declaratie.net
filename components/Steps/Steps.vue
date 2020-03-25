<template>
    <div>
        <main>
            <el-steps :active="step" align-center simple finish-status="success">
                <el-step title="Pas 1"></el-step>
                <el-step title="Pas 2"></el-step>
                <el-step title="Pas 3"></el-step>
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

            <p class="text simple">* Informatiile din formular sunt salvate doar in browser</p>
            <p class="text simple">* Aplicatia nu colecteaza niciun fel de date personale</p>
            <p class="text simple">* Utilizand aceasta aplicatie, fiecare utilizator isi asuma responsabilatea pentru corectitudinea, integralitatea și actualitatea informațiilor furnizate.</p>
        </main>
        <footer>
            <el-button :type="step === buttonLabels.length ? 'success' : 'primary'" @click="step < buttonLabels.length ? step++ : step">{{ buttonLabels[step-1] }}</el-button>
        </footer>    
    </div>
</template>