<template lang="pug">
  div
    form(@submit.prevent="update")
      .card-body
        h3.card-title Edit Account
        .row
          .col-sm-6.col-md-6
            .form-group
              label.form-label Email address
              input.form-control(type='email', placeholder='Email', v-model="email")
          .col-sm-6.col-md-6
            .form-group
              label.form-label Display name
              input.form-control(type='text', placeholder='Display name', v-model="displayName")
          .col-sm6.col-md-6
            .form-group
              label.form-label Language
              select.form-control.custom-select(v-model="language")
                option(value='en') English
                option(value='pl') Polish
      .card-footer.text-right
        button.btn.btn-primary(type='submit') Update

</template>

<script>
  import {updateAccountDetails} from '@/service/user.service';
  import {notification} from "@/utils/toastr.utils";

  export default {
    data: () => ({
      email: null,
      displayName: null,
      language: null
    }),
    mounted() {
      this.$parent.currentTab = this.$parent.tabs.account.name;
    },
    methods: {
      update() {
        if (this.language !== null) {
          this.$cookie.set('lang', this.language);
        }

        updateAccountDetails({email: this.email, displayName: this.displayName})
        .then(() => {
          notification.success('Updated');
        })
        .catch(error => {
          notification.error(error.message);
        })
      }
    },
    components: {

    }
  }
</script>