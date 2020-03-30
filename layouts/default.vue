<template>
    <div>
      <nuxt keep-alive />
      <transition name="slide-up" mode="out-in" appear>
        <div id="disclaimer" v-if="disclaimer">
          <CloseButton @click.native="disclaimer = false" />
          <h1>Atentiune!</h1>
          <p>
            Acest site este dedicat doar celor care detin o imprimanta. 
            Declaratia pe propria raspundere nu este valabila decat printata si semnata olograf, 
            ea putand fi printata la finalul completarii formularului.
          </p>
          <p>
            Definitie <strong>OLOGRAF</strong>:
          </p>
          <p>
            <strong>Care este scris în întregime de mâna autorului și semnat de el însuși.</strong>
          </p>
        </div>
      </transition>
      <footer>
        Aplicatie oferita gratuit de <br/> <a href="https://digitap.eu" target="_blank"><Digitap /></a>de la Cluj + Bucuresti
      </footer>
      <portal-target name="drawer"></portal-target>
    </div>
</template>

<script>
import Digitap from '@/assets/svg/digitap.logo.simplified.svg?inline';
import CloseButton from '@/components/CloseButton';
export default {
  components: {
    Digitap,
    CloseButton
  },
  data(){
    return {
      disclaimer: false
    }
  },
  mounted(){
    setTimeout(() => {
      this.disclaimer = true;
    }, 1000);
  }
}
</script>

<style lang="less">

#disclaimer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;
  background: gold;
  z-index: 100;

  @media screen and (min-width: 990px){
    width: 700px;
    height: 250px;
    top: calc(50% - 125px);
    left: calc(50% - 350px);
    right: unset;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  p {
    margin: 0 0 20px;
  }
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

html, body, #__nuxt, #__layout {
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: auto;
  justify-content: center;
  min-height: 100%;
}

body:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: -webkit-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-image: -moz-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-image: -ms-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    background-image: repeating-radial-gradient(center center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 1px, transparent 1px, transparent 100%);
    -webkit-background-size: 25px 25px;
    -moz-background-size: 25px 25px;
    background-size: 25px 25px;
    pointer-events: none;
    z-index: 1;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.container {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    min-height: calc(100% - 100px);
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    padding: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all .25s ease-in-out !important;
}
.slide-up-enter, .slide-up-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(120%) !important;

    @media screen and (min-width: 990px){
      transform: translateY(300%) !important;
    }
}

.fade-in-enter,
.fade-in-leave-to {
    opacity: 0;
}

.fade-in-enter-active,
.fade-in-leave-active {
    transition: all .5s ease;
}

footer {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  font-size: 12px;

  @media screen and (min-width: 990px){
    font-size: 16px;
  }

  svg {
    width: 100px;
    height: auto;
    margin: 0 10px;
  }
}

</style>
