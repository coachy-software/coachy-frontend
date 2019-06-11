import Vue from 'vue';
import VueC3 from 'vue-c3';
import musclesGroups from "@/assets/initials/muscles-groups";

export default {
  data: () => ({
    handler: new Vue()
  }),
  props: ['schedule'],
  components: {
    VueC3
  },
  mounted() {
    let chartData = new Map();

    for (let i = 0; i < musclesGroups.length; i++) {

      this.schedule.days.forEach(day => {
        day.exercises.forEach(exercise => {
          let muscleGroup = musclesGroups[i];
          if (exercise.template.muscleGroup === muscleGroup) {
            chartData.set(muscleGroup, exercise.sets);
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
      legend: {
        show: true
      },
      padding: {
        bottom: 0,
        top: 0
      }
    };

    this.handler.$emit('init', options);
    this.$parent.isLoading = false;
  }
}
