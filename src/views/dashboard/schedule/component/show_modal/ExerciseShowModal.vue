<template lang="pug">
  div
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
          template(v-if="exercise.template")
            .col-sm-6.mt-4
              .form-group
                label {{$t('schedule.brief')}}
                button.btn.btn-link(@click="openBriefModal(exercise.template.briefDescription)") {{$t('schedule.show')}}
            .col-sm-6.mt-4
              .form-group
                label {{$t('schedule.muscle_group')}}
                h4 {{exercise.template.muscleGroup}}
            .col-sm-12
              Carousel(:navigationEnabled="true", :scrollPerPage="true", :perPageCustom="[[480, 2], [768, 3]]").mt-5
                Slide(v-for="(image, index) in exercise.template.exampleImages")
                  img(:src="modalImage", @click=`openImageModal(image)`, style="width: 300px; max-width: 100%;")
    sweet-modal(ref="exerciseImage")
      img(:src="modalImage")
    sweet-modal(ref="exerciseBrief")
      pre.text-justify {{modalBriefDescription}}
</template>
<script>
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
  import {required} from "vuelidate/src/validators";
  import {Carousel, Slide} from 'vue-carousel';

  export default {
    name: 'exercise-show-modal',
    data: () => ({
      exercise: {},
      modalImage: '',
      modalBriefDescription: ''
    }),
    components: {
      sweetModal: SweetModal,
      sweetModalTab: SweetModalTab,
      Carousel,
      Slide
    },
    methods: {
      openModal(exercise) {
        this.exercise = exercise;
        this.$refs.exerciseShowModal.open();
      },
      closeModal() {
        this.$refs.exerciseShowModal.close();
      },
      openImageModal(modalImage) {
        this.modalImage = modalImage;
        this.$refs.exerciseImage.open();
      },
      openBriefModal(modalContent) {
        this.modalBriefDescription = modalContent;
        this.$refs.exerciseBrief.open();
      }
    },
    validations: {
      name: {required},
    }
  }
</script>