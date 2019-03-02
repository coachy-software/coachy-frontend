<template lang="pug">
  sweet-modal(overlay-theme='light', modal-theme='light', ref="exerciseAddModal")
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
            input.form-control(type='number', :placeholder="$t('schedule.sets')", v-model="sets", min=1)
        .col-sm-6.col-md-4
          .form-group
            label.form-label {{$t('schedule.miniSets')}}
            input.form-control(type='number', :placeholder="$t('schedule.miniSets')", v-model="miniSets")
        .col-sm-6.col-md-4
          .form-group
            label.form-label {{$t('schedule.reps')}}
            input.form-control(type='number', :placeholder="$t('schedule.reps')", v-model="reps", min=1)
        .col-md-6
          .form-group
            .custom-switches-stacked.mt-5
              label.custom-switch
                input.custom-switch-input(type='checkbox', name='custom-switch-checkbox', v-model="customTemplate")
                span.custom-switch-indicator
                span.custom-switch-description {{$t('schedule.add_own')}}
        .col-md-6(v-if="!customTemplate")
          .form-group
            label.form-label {{$t('schedule.template')}}
              vue-instant(
                :suggestonallwords='true',
                :suggestion-attribute='suggestionAttribute',
                v-model='value',
                :disabled='false',
                @input='changed',
                @click-input='clickInput',
                @click-button='clickButton',
                @selected='selected',
                @enter='enter',
                @key-up='keyUp',
                @key-down='keyDown',
                @key-right='keyRight',
                @clear='clear',
                @escape='escape',
                :show-autocomplete='true',
                :autofocus='false',
                :suggestions='suggestions',
                type='custom',
                :placeholder="$t('schedule.template_placeholder')"
              )
        .col-md-6(v-else)
        template(v-if="customTemplate")
          .col-md-6
            .form-group
              label.form-label {{$t('schedule.muscle_group')}}
              select.form-control.custom-select(v-model="muscleGroup")
                option(v-for="item in musclesGroups", :value="item") {{item}}
          .col-md-6
            .form-group
              .custom-file
                label.form-label {{$t('schedule.example_images')}}
                input(type="file", id="avatar", accept="image/png, image/jpeg", ref="file", multiple)
          .col-md-12
            .form-group
              label.form-label {{$t('schedule.brief')}}
                span.form-label-small {{brief.length}}/1000
              textarea.form-control(rows='6', :placeholder="$t('schedule.brief')", v-model.trim="$v.brief.$model", maxlength=1000)
                | test sdasda
    .card-footer
      button.btn.btn-outline-primary.float-right(slot='button', @click="$parent.addExercise(dayIndex)", :disabled="$v.$invalid") {{$t('schedule.submit')}}
</template>
<style src="./style.css"></style>
<script>
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
  import {required, maxLength} from "vuelidate/src/validators";
  import musclesGroups from "@/assets/mock/muscles-groups.json";
  import axios from "axios";

  export default {
    data: () => ({
      name: '',
      sets: 1,
      miniSets: 0,
      reps: 1,
      dayIndex: null,
      template: null,
      customTemplate: false,
      musclesGroups: musclesGroups,
      muscleGroup: musclesGroups[0],
      brief: '',

      value: '',
      suggestionAttribute: 'original_title',
      suggestions: [],
      selectedEvent: ""
    }),
    name: 'exercise-add-modal',
    components: {
      sweetModal: SweetModal,
      sweetModalTab: SweetModalTab
    },
    methods: {
      openModal(dayIndex) {
        this.dayIndex = dayIndex;
        this.$refs.exerciseAddModal.open();
      },
      closeModal() {
        this.$refs.exerciseAddModal.close();
      },
      clickInput: function () {
        this.selectedEvent = 'click input'
      },
      clickButton: function () {
        this.selectedEvent = 'click button'
      },
      selected: function () {
        this.selectedEvent = 'selection changed'
      },
      enter: function () {
        this.selectedEvent = 'enter'
      },
      keyUp: function () {
        this.selectedEvent = 'keyup pressed'
      },
      keyDown: function () {
        this.selectedEvent = 'keyDown pressed'
      },
      keyRight: function () {
        this.selectedEvent = 'keyRight pressed'
      },
      clear: function () {
        this.selectedEvent = 'clear input'
      },
      escape: function () {
        this.selectedEvent = 'escape'
      },
      changed: function () {
        var that = this;
        this.suggestions = [];
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' + this.value)
        .then(function (response) {
          response.data.results.forEach(function (a) {
            that.suggestions.push(a)
          })
        })
      }
    },
    validations: {
      name: {required},
      brief: {maxLength: maxLength(1000)},
      template: {required}
    }
  }
</script>