<template lang="pug">
  sweet-modal(blocking='', overlay-theme='light', modal-theme='light', ref="exerciseModal")
    h3.card-title {{$t('schedule.add_exercise')}}
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
      button.btn.btn-outline-primary.float-right(slot='button', @click="$parent.addExercise(dayIndex)", :disabled="$v.$invalid") {{$t('schedule.submit')}}
</template>
<script>
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
  import {required} from "vuelidate/src/validators";

  export default {
    data: () => ({
      name: '',
      sets: 1,
      miniSets: 0,
      reps: 1,
      dayIndex: null
    }),
    name: 'exercise-modal',
    components: {
      sweetModal: SweetModal,
      sweetModalTab: SweetModalTab,
    },
    methods: {
      openModal(dayIndex) {
        this.dayIndex = dayIndex;
        this.$refs.exerciseModal.open();
      },
      closeModal() {
        this.$refs.exerciseModal.close();
      }
    },
    validations: {
      name: {required},
    }
  }
</script>