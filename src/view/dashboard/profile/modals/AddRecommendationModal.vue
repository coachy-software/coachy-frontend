<template lang="pug">
  sweet-modal(overlay-theme='dark', modal-theme='light', ref="modal", blocking)
    h3.card-title {{$t('profile.add_recommendation')}}
    form(@submit.prevent="postRecommendation")
      .card-body
        .row
          .col-md-12
            .form-group
              label.form-label {{$t('profile.content')}}
                span.form-required *
              textarea.form-control(:class="{'is-invalid': $v.content.$error}", :placeholder="$t('profile.content_placeholder')", v-model.trim="$v.content.$model")
              .invalid-feedback(v-if="!$v.content.required") {{$t('profile.content_required')}}
            .form-group
              label.form-check-label {{$t('profile.rating')}}
                span.form-required *
              input.form-control(:class="{'is-invalid': $v.rating.$error}", type='number', v-model.trim="$v.rating.$model")
              .invalid-feedback(v-if="!$v.rating.minValue") {{$t('profile.min_rating')}}
              .invalid-feedback(v-if="!$v.rating.maxValue") {{$t('profile.max_rating')}}
      .card-footer
        button.btn.btn-primary.float-right(type="submit", :disabled="$v.$invalid") {{$t('profile.submit')}}
</template>
<script>
  import {SweetModal, SweetModalTab} from "sweet-modal-vue";
  import {maxValue, minValue, required} from "vuelidate/src/validators";
  import ProfileService from "@/service/profile.service"
  import {notification} from "@/util/toastr.utils";

  export default {
    props: ['profileUserId'],
    data: () => ({
      content: '',
      rating: 0
    }),
    components: {
      SweetModal,
      SweetModalTab
    },
    methods: {
      openModal() {
        this.$refs.modal.open();
      },
      closeModal() {
        this.$refs.modal.close();
      },
      postRecommendation() {
        let creatorIdentifier = JSON.parse(localStorage.getItem('user')).identifier;
        ProfileService.createRecommendation({profileUserId: this.profileUserId, from: creatorIdentifier, content: this.content, rating: this.rating})
        .then(() => {
          notification.success(this.$t('profile.recommendation_created'));
          this.closeModal()
        })
        .catch(() => {
          notification.error(this.$t('profile.recommendation_failed'));
          this.closeModal();
        })
      }
    },
    validations: {
      content: {required},
      rating: {minValue: minValue(1), maxValue: maxValue(10)}
    }
  }
</script>
