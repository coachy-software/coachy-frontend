<template lang="pug">
  .app
    p landing
    router-view
</template>

<script>
  export default {
    mounted() {
      this.$router.push('/dashboard');
    }
  }
</script>
