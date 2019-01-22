<template lang="pug">
  .page
    .page-content
      .container.text-center
        .display-1.text-muted.mb-5
          i.si.si-exclamation
          |  400
        h1.h2.mb-3 Oops.. You just found an error page..
        p.h4.text-muted.font-weight-normal.mb-7 We are sorry but your request contains bad syntax and cannot be fulfilled…
        button.btn.btn-primary(@click="$router.back()")
          i.fe.fe-arrow-left.mr-2
          | Go back
</template>

<style scoped>
  @import url('~tabler-ui/dist/assets/css/dashboard.css');
</style>