<template lang="pug">
  sweet-modal(overlay-theme='light', modal-theme='light', ref="exerciseShowModal")
    h3 {{exercise.name}}
    .card-body
      .row
        .col-sm-6.col-md-4
          .form-group
            label {{$t('schedule.sets')}}
            h4 {{exercise.sets}}
        .col-sm-6.col-md-4
          .form-group
            label {{$t('schedule.miniSets')}}
            h4 {{exercise.miniSets}}
        .col-sm-6.col-md-4
          .form-group
            label {{$t('schedule.reps')}}
            h4 {{exercise.reps}}
</template>
<script>
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
  import {required} from "vuelidate/src/validators";

  export default {
    name: 'exercise-show-modal',
    data: () => ({
      exercise: {}
    }),
    components: {
      sweetModal: SweetModal,
      sweetModalTab: SweetModalTab,
    },
    methods: {
      openModal(exercise) {
        this.exercise = exercise;
        this.$refs.exerciseShowModal.open();
      },
      closeModal() {
        this.$refs.exerciseShowModal.close();
      }
    },
    validations: {
      name: {required},
    }
  }
</script>