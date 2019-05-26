import axios from "axios";
import {obtainImage} from "@/util/file.utils";
import {multipartHeader, trimLocationHeader} from "@/util/headers";
import {API_URL} from "@/util/constants";
import {notification} from "@/util/toastr.utils";
import {getErrorMessage} from "@/util/validation.utils";
import ObjectID from "bson-objectid";
import Build from "./component/build/BuildView";

export default {
  data: () => ({
    ownerId: {},
    type: 'BUILD',
    images: [],
    imagesPreviews: [],
    copyFromSchedule: false,
    measurements: [],
    name: '',
    weight: '',
    reps: ''
  }),
  components: {
    Build
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
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
    }
  }
}
