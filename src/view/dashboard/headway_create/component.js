import {minValue, required} from "vuelidate/src/validators";
import axios from "axios";
import {obtainImage} from "@/util/file.utils";
import {multipartHeader, trimLocationHeader} from "@/util/headers";
import {API_URL} from "@/util/constants";
import {notification} from "@/util/toastr.utils";
import {getErrorMessage} from "@/util/validation.utils";
import ObjectID from "bson-objectid";

export default {
  data: () => ({
    ownerId: {},
    neck: 0,
    arm: 0,
    forearm: 0,
    wrist: 0,
    chest: 0,
    waist: 0,
    thigh: 0,
    calf: 0,
    type: 'BUILD',
    images: [],
    imagesPreviews: [],
    copyFromSchedule: false,
    measurements: [],
    name: '',
    weight: '',
    reps: ''
  }),
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  validations: {
    neck: {required, minValue: minValue(10)},
    arm: {required, minValue: minValue(10)},
    forearm: {required, minValue: minValue(10)},
    wrist: {required, minValue: minValue(10)},
    chest: {required, minValue: minValue(10)},
    waist: {required, minValue: minValue(10)},
    thigh: {required, minValue: minValue(10)},
    calf: {required, minValue: minValue(10)}
  },
  methods: {
    appendToMeasurements() {
      this.measurements.push({id: ObjectID.generate(), name: this.name, value: this.weight, reps: this.reps})
    },
    uploadFiles() {
      let promises = [];

      return new Promise((resolve) => {
        this.images.filter(image => image.active).forEach(image => {
          let uploadPromise = axios.post(`${API_URL}/uploads`,
              obtainImage(image.file, 'headway_images'),
              multipartHeader()
          ).then(response => response.headers.location);

          promises.push(uploadPromise);
        });

        return resolve(Promise.all(promises));
      });
    },
    createHeadway() {
      this.uploadFiles().then(images => {
        let data = {
          ownerId: JSON.parse(localStorage.getItem('user')).identifier,
          type: this.type,
          images: images
        };
        
        let buildMeasurements = [
          {id: ObjectID.generate(), name: 'neck', value: this.neck},
          {id: ObjectID.generate(), name: 'arm', value: this.arm},
          {id: ObjectID.generate(), name: 'forearm', value: this.forearm},
          {id: ObjectID.generate(), name: 'wrist', value: this.wrist},
          {id: ObjectID.generate(), name: 'chest', value: this.chest},
          {id: ObjectID.generate(), name: 'waist', value: this.waist},
          {id: ObjectID.generate(), name: 'thigh', value: this.thigh},
          {id: ObjectID.generate(), name: 'calf', value: this.calf}
        ];
        this.type === 'BUILD' ? data.measurements = buildMeasurements : data.measurements = this.measurements;

        let urlToPush = (response) => `/dashboard/headway-journals/${trimLocationHeader(response.headers.location)}`;
        this.$store.dispatch('headway/add', data).then((response) => this.$router.push(urlToPush(response)));
      })
      .catch(error => notification.error(getErrorMessage('headway_create', error)));
    },
    imageClickHandler(index) {
      document.getElementById('image' + index).toggleAttribute('checked');
      this.images[index].active = !this.images[index].active;
    },
    handleFileChange() {
      this.images = Array.from(this.$refs.images.files);

      for (let i = 0; i < this.images.length; i++) {
        this.getBase64(this.images[i]);
        this.images[i] = {file: this.images[i], active: true};
      }
    },
    getBase64(file) {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => this.imagesPreviews.push({file: reader.result, active: true});
    }
  }
}
