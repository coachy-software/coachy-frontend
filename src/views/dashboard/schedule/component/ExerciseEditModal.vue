<template lang="pug">
  sweet-modal(overlay-theme='light', modal-theme='light', ref="exerciseEditModal")
    h3.card-title {{$t('schedule.edit_exercise')}}
    .card-body
      .row
        .col-md-12
          .form-group
            label.form-label {{$t('schedule.name')}}
            input.form-control(:class="{'is-invalid': $v.name.$error}", type='text', :placeholder="$t('schedule.name_placeholder')", v-model.trim="$v.name.$model")
            .invalid-feedback(v-if="!$v.name.required") {{$t('validation.name_required')}}
        .col-sm-6.col-md-4
          .form-group
            label.form-label {{$t('schedule.sets')}}
            input.form-control(type='number', placeholder='Sets', v-model="sets", min=1)
        .col-sm-6.col-md-4
          .form-group
            label.form-label {{$t('schedule.miniSets')}}
            input.form-control(type='number', placeholder='Minisets', v-model="miniSets")
        .col-sm-6.col-md-4
          .form-group
            label.form-label {{$t('schedule.reps')}}
            input.form-control(type='number', placeholder='Reps', v-model="reps", min=1)
    .card-footer
      button.btn.btn-outline-primary.float-right.ml-2(slot='button', @click="$parent.editExercise(dayIndex)", :disabled="$v.$invalid") {{$t('schedule.update')}}
      button.btn.btn-outline-danger.float-right(slot='button', @click="$parent.removeExercise(dayIndex, exercise.identifier)", :disabled="$v.$invalid") {{$t('schedule.remove')}}
</template>
<script>
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
  import {required} from "vuelidate/src/validators";

  export default {
    data: () => ({
      exercise: {},
      name: '',
      sets: 0,
      miniSets: 0,
      reps: 0,
      dayIndex: null
    }),
    name: 'exercise-edit-modal',
    components: {
      sweetModal: SweetModal,
      sweetModalTab: SweetModalTab,
    },
    methods: {
      openModal(dayIndex, exercise) {
        this.dayIndex = dayIndex;
        this.exercise = exercise;
        this.name = exercise.name;
        this.sets = exercise.sets;
        this.miniSets = exercise.miniSets;
        this.reps = exercise.reps;

        this.$refs.exerciseEditModal.open();
      },
      closeModal() {
        this.$refs.exerciseEditModal.close();
      }
    },
    validations: {
      name: {required},
    }
  }
</script>