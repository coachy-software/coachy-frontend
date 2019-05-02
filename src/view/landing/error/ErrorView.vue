<template lang="pug">
  .page
    .page-content
      .container.text-center
        .display-1.text-muted.mb-5
          i.si.si-exclamation
          |  404
        h1.h2.mb-3 {{this.$t('error.title')}}
        p.h4.text-muted.font-weight-normal.mb-7 {{this.$t('error.brief')}}
        button.btn.btn-primary(@click="$router.back()")
          i.fe.fe-arrow-left.mr-2
          | {{this.$t('error.back_button')}}
</template>

<style scoped>
  @import url('~coachy-tabler-ui/dist/assets/css/dashboard.css');
</style>