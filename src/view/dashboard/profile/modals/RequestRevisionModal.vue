<template lang="pug">
  sweet-modal(overlay-theme='dark', modal-theme='light', ref="modal", blocking)
    form(@submit.prevent="requestRevision")
      .card-body
        h1 {{$t('profile.are_you_sure')}}
        div(style="display: flex; justify-content: center;")
          button.btn.btn-square.btn-gray.btn-lg(type='button', @click="closeModal") {{$t('profile.no')}}
          button.btn.btn-square.btn-danger.btn-lg.ml-2(type='submit') {{$t('profile.yes')}}
</template>
<script>
  import ProfileService from "@/service/profile.service";
  import {notification} from "@/util/toastr.utils";
  import {SweetModal, SweetModalTab} from "sweet-modal-vue";
  import {getErrorMessage} from "@/util/validation.utils";

  export default {
    data: () => ({
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
      requestRevision() {
        ProfileService.requestRevision({identifier: this.recommendationId})
        .then(() => {
          notification.success(this.$t('profile.request_revision_notification'));
          this.closeModal();
        })
        .catch(error => {
          notification.error(getErrorMessage('profile', error));
          this.closeModal();
        })
      }
    }
  }
</script>
