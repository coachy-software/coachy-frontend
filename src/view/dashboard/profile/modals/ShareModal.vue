<template lang="pug">
  sweet-modal(overlay-theme='light', modal-theme='light', ref="modal")
    .card-body
      .input-group
        input.form-control#link_input(name='url', type='text', :value='concatenateLocationWithRoute()' readonly)
        span.input-group-append.ml-0
        button.btn.btn-secondary(type='button', @click="copyLink") {{$t('profile.copy')}}

</template>
<script>
  import {SweetModal, SweetModalTab} from "sweet-modal-vue";

  export default {
    props: ['link'],
    components: {
      SweetModal,
      SweetModalTab
    },
    methods: {
      openModal() {
        this.$refs.modal.open();
      },
      concatenateLocationWithRoute() {
        return location.origin + this.link;
      },
      copyLink() {
        let element = document.getElementById("link_input");

        element.focus();
        element.select();

        document.execCommand('copy');
      }
    }
  }
</script>
