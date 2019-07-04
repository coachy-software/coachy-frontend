<template lang="pug">
  sweet-modal(overlay-theme='dark', modal-theme='light', ref="modal", blocking)
    h3.card-title {{$t('profile.edit_recommendation')}}
    form(@submit.prevent="commitRecommendation")
      .card-body
        .row
          .col-md-12
            .form-group
              label.form-label {{$t('profile.content')}}
                span.form-required *
              textarea.form-control(:class="{'is-invalid': $v.content.$error}", :placeholder="$t('profile.content_placeholder')", v-model.trim="$v.content.$model")
              .invalid-feedback(v-if="!$v.content.required") {{$t('profile.content_required')}}
              .invalid-feedback(v-if="!$v.content.maxLength") {{$t('profile.content_max')}}
            .form-group
              label.form-check-label {{$t('profile.rating')}}
                span.form-required *
              input.form-control(:class="{'is-invalid': $v.rating.$error}", type='number', v-model.trim="$v.rating.$model")
              .invalid-feedback(v-if="!$v.rating.minValue") {{$t('profile.min_rating')}}
              .invalid-feedback(v-if="!$v.rating.maxValue") {{$t('profile.max_rating')}}
      .card-footer
        button.btn.btn-primary.float-right(type="submit", :disabled="$v.$invalid") {{$t('profile.edit')}}
</template>
<script>
  import {SweetModal, SweetModalTab} from "sweet-modal-vue";
  import {maxLength, maxValue, minValue, required} from "vuelidate/src/validators";
  import ProfileService from "@/service/profile.service";
  import {notification} from "@/util/toastr.utils";

  export default {
    data: () => ({
      content: '',
      rating: 0
    }),
    components: {
      SweetModal,
      SweetModalTab
    },
    created() {
      ProfileService.fetchRecommendation({identifier: this.$route.params.recommendationId})
      .then(response => {
        ({content: this.content, rating: this.rating} = response.data);
      })
      .catch(() => this.$router.back());
    },
    mounted() {
      this.openModal();
    },
    methods: {
      openModal() {
        this.$refs.modal.open();
      },
      closeModal() {
        this.$refs.modal.close();
      },
      commitRecommendation() {
        ProfileService.commitRevision({identifier: this.$route.params.recommendationId, content: this.content, rating: this.rating})
        .then(() => {
          notification.success(this.$t('profile.recommendation_changed_notification'));
          this.closeModal();
          this.$router.push(`/dashboard/profiles/${this.$route.params.id}`);
        })
        .catch(() => {
          notification.error(this.$t('profile.recommendation_changed_failed_notification'));
          this.closeModal();
          this.$router.push(`/dashboard/profiles/${this.$route.params.id}`);
        })
      }
    },
    validations: {
      content: {required, maxLenght: maxLength(300)},
      rating: {minValue: minValue(1), maxValue: maxValue(10)}
    }
  }
</script>
