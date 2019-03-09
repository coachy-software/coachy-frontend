import Vue from 'vue';
import VueC3 from 'vue-c3';
import musclesGroups from "@/assets/mock/muscles-groups";

export default {
  data: () => ({
    handler: new Vue()
  }),
  props: ['schedule'],
  components: {
    VueC3
  },
  watch: {
    'schedule': function (schedule) {
      this.schedule = schedule;
    }
  },
  mounted() {
    let chartData = new Map();

    for (let i = 0; i < musclesGroups.length; i++) {
      let exerciseCount = 0;

      this.schedule.days.forEach(day => {
        day.exercises.forEach(exercise => {
          let muscleGroup = musclesGroups[i];
          if (exercise.template.muscleGroup === muscleGroup) {
            exerciseCount++;
            chartData.set(muscleGroup, exerciseCount);
          }
        });
      });
    }

    let colors = {
      "Barki": '#1c3353',
      "Klatka piersiowa": '#467fcf',
      "Biceps": '#7ea5dd',
      "Przedramiona": '#324764',
      "Brzuch i korpus": '#5a6b83',
      "Triceps": '#a4c0e7',
      "Plecy": '#6484b0',
      "Pośladki": '#324258',
      "Uda": '#19212c',
      "Łydki": '#1c3353',
      "Inne": '#495b75'
    };

    let options = {
      data: {
        columns: Array.from(chartData),
        type: 'pie',
        colors: colors
      },
      axis: {},
      legend: {
        show: true, //hide legend
      },
      padding: {
        bottom: 0,
        top: 0
      }
    };

    this.handler.$emit('init', options);
  }
}