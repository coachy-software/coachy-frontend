import axios from "axios";
import ObjectID from "bson-objectid";
import {API_URL} from "@/utils/constants";
import {obtainImage} from "@/utils/file.utils";
import {multipartHeader} from "@/utils/headers";
import store from "@/store";

export function addExercise(dayIndex, exerciseInstance, schedule) {
  let files = exerciseInstance.$refs.exampleImages.files;

  uploadImages(files).then((imageUrls) => {
    schedule.days[dayIndex].exercises.push({
      identifier: ObjectID.generate(),
      name: exerciseInstance.name,
      sets: exerciseInstance.sets,
      reps: exerciseInstance.reps,
      miniSets: exerciseInstance.miniSets,
      template: exerciseInstance.customTemplate ? {
        identifier: ObjectID.generate(),
        name: exerciseInstance.name,
        exampleImages: imageUrls,
        briefDescription: exerciseInstance.brief,
        muscleGroup: exerciseInstance.muscleGroup
      } : exerciseInstance.suggestions[0]
    });
    store.dispatch('schedule/update', schedule);
    closeModal(exerciseInstance);
  });
}

export function removeExercise(dayIndex, exerciseIdentifier, exerciseInstance, schedule) {
  schedule.days[dayIndex].exercises = schedule.days[dayIndex]
  .exercises.filter(exercise => exercise.identifier !== exerciseIdentifier);

  store.dispatch('schedule/update', schedule);
  closeModal(exerciseInstance);
}

export function editExercise(dayIndex, exerciseInstance, schedule) {
  schedule.days[dayIndex].exercises.filter(exercise => exercise === exerciseInstance.exercise)
  .map(exercise => {
        exercise.name = exerciseInstance.name;
        exercise.sets = exerciseInstance.sets;
        exercise.reps = exerciseInstance.reps;
        exercise.miniSets = exerciseInstance.miniSets;
        exercise.template = exerciseInstance.customTemplate ? {
          identifier: ObjectID.generate(),
          name: exerciseInstance.name,
          exampleImages: exerciseInstance.exampleImages,
          briefDescription: exerciseInstance.brief,
          muscleGroup: exerciseInstance.muscleGroup
        } : exerciseInstance.suggestions[0];
      }
  );

  store.dispatch('schedule/update', schedule);
  closeModal(exerciseInstance);
}

export function removeExerciseImage(dayIndex, exerciseIndex, imageIndex, exerciseInstance, schedule) {
  let exampleImages = schedule.days[dayIndex].exercises[exerciseIndex].template.exampleImages;

  console.log('*****');
  exampleImages.forEach(value => console.log(value));
  console.log('*****');

  schedule.days[dayIndex].exercises[exerciseIndex].template.exampleImages = exampleImages
  .filter(image => image !== exampleImages[imageIndex]);

  store.dispatch('schedule/update', schedule);
}

function closeModal(instance) {
  instance.closeModal();
}

function uploadImages(files) {
  let exampleImages = [];

  return new Promise((resolve) => {
    for (let i = 0; i < files.length; i++) {
      let uploadPromise = axios.post(`${API_URL}/uploads`,
          obtainImage(files[i], '/exercises/samples'),
          multipartHeader()
      )
      .then(response => {
        return response.data.fileUrl;
      });

      exampleImages.push(uploadPromise);
    }

    return resolve(Promise.all(exampleImages));
  });
}
