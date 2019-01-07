<template lang="pug">
  .home
    img(alt="Vue Logo" src="../assets/logo.png")
    HelloWorld(msg="Wecolme to Your Vue.js App")
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    }
  }
</script>
