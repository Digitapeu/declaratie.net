<template>
  <nuxt-link class="logo" :to="{path: '/'}">declaratie.net</nuxt-link>
</template>
<style>
.logo {
  animation: 1s appear;
  margin: auto;
  font-size: 40px;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  box-sizing: border-box;
  padding: 10px 20px;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
