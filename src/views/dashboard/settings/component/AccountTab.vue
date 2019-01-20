<template lang="pug">
  div
    .card-body
      h3.card-title Edit Account
      .row
        .col-sm-6.col-md-6
          .form-group
            label.form-label Email address
            input.form-control(type='email', placeholder='Email')
        .col-sm-6.col-md-6
          .form-group
            label.form-label Username
            input.form-control(type='text', placeholder='Username')
        .col-sm-6.col-md-6
          .form-group
            label.form-label Display name
            input.form-control(type='text', placeholder='Display name')
    .card-footer.text-right
      button.btn.btn-primary(type='submit') Update

</template>

<script>
  export default {
    data: () => ({
      username: null,
      email: null,
      displayName: null
    }),
    mounted() {
      this.$parent.currentTab = this.$parent.tabs.account.name;
    }
  }
</script>