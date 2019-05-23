import {minValue, required} from "vuelidate/src/validators";
import axios from "axios";
import {obtainImage} from "@/util/file.utils";
import {multipartHeader, trimLocationHeader} from "@/util/headers";
import {API_URL} from "@/util/constants";
import {notification} from "../../../util/toastr.utils";
import {getErrorMessage} from "../../../util/validation.utils";

export default {
  data: () => ({
    ownerId: {},
    neckMeasurement: 0,
    armMeasurement: 0,
    forearmMeasurement: 0,
    wristMeasurement: 0,
    chestMeasurement: 0,
    waistMeasurement: 0,
    thighMeasurement: 0,
    calfMeasurement: 0,
    images: [],
    imagesPreviews: []
  }),
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  validations: {
    neckMeasurement: {required, minValue: minValue(10)},
    armMeasurement: {required, minValue: minValue(10)},
    forearmMeasurement: {required, minValue: minValue(10)},
    wristMeasurement: {required, minValue: minValue(10)},
    chestMeasurement: {required, minValue: minValue(10)},
    waistMeasurement: {required, minValue: minValue(10)},
    thighMeasurement: {required, minValue: minValue(10)},
    calfMeasurement: {required, minValue: minValue(10)}
  },
  methods: {
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
          neckMeasurement: this.neckMeasurement,
          armMeasurement: this.armMeasurement,
          forearmMeasurement: this.forearmMeasurement,
          wristMeasurement: this.wristMeasurement,
          chestMeasurement: this.chestMeasurement,
          waistMeasurement: this.waistMeasurement,
          thighMeasurement: this.thighMeasurement,
          calfMeasurement: this.calfMeasurement,
          images: images
        };

        let urlToPush = (response) => `/dashboard/headways/${trimLocationHeader(response.headers.location)}`;
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
