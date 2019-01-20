<template lang="pug">
  div
    .card-body
      h3.card-title Change or reset avatar
      .alert.alert-warning(role='alert')
        | #[i.fe.fe-bell.mr-2] Image size cannot be #[strong higher than 3MB].
        | Only files with following extensions are allowed: #[strong png jpg jpeg]
      .row
        .col-sm-6.col-md-6
          .form-group
            .custom-file
              input(type="file", id="avatar", name="avatar", accept="image/png, image/jpeg")
    .card-footer.text-right
      button.btn.btn-primary(type='submit') Update
</template>

<script>
  export default {
    mounted() {
      this.$parent.currentTab = this.$parent.tabs.avatar.name;
    }
  }
</script>