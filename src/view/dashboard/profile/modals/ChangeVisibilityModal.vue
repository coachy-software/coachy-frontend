<template lang="pug">
  sweet-modal(overlay-theme='dark', modal-theme='light', ref="modal", blocking)
    h3.card-title {{$t('profile.change_visibility')}}
    form(@submit.prevent="changeVisibility")
      .card-body
        .row
          .col-md-12
            .form-group
              label.form-label {{$t('profile.visibility')}}
                span.form-required *
              select.form-control.custom-select(v-model="visible")
                option(:value="true") {{$t('profile.visible')}}
                option(:value="false") {{$t('profile.invisible')}}
      .card-footer
        button.btn.btn-primary.float-right(type='submit') {{$t('profile.submit_visibility')}}
</template>
<script>
  import {SweetModal, SweetModalTab} from "sweet-modal-vue";
  import ProfileService from "@/service/profile.service";
  import {notification} from "@/util/toastr.utils";

  export default {
    data: () => ({
      visible: true,
      recommendationId: ''
    }),
    components: {
      SweetModal,
      SweetModalTab
    },
    methods: {
      openModal(recommendationId) {
        this.recommendationId = recommendationId;
        this.$refs.modal.open();
      },
      closeModal() {
        this.$refs.modal.close();
      },
      changeVisibility() {
        ProfileService.changeVisibility({visible: this.visible, identifier: this.recommendationId})
        .then(() => {
          notification.success(this.$t('profile.visibility_changed'));
          this.closeModal();
        })
      }
    }
  }
</script>
