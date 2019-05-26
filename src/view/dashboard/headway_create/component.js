import axios from "axios";
import {obtainImage} from "@/util/file.utils";
import {multipartHeader, trimLocationHeader} from "@/util/headers";
import {API_URL} from "@/util/constants";
import {notification} from "@/util/toastr.utils";
import {getErrorMessage} from "@/util/validation.utils";
import Build from "./component/build/BuildView";
import Strength from "./component/strength/StrengthView";

export default {
  data: () => ({
    type: 'BUILD'
  }),
  components: {
    Build,
    Strength
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  methods: {
    uploadFiles() {
      let promises = [];

      return new Promise((resolve) => {
        this.$refs.build.images.filter(image => image.active).forEach(image => {
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
      if (this.type === 'BUILD') {
        this.uploadFiles().then(images => {
          let data = {
            ownerId: JSON.parse(localStorage.getItem('user')).identifier,
            measurements: this.$refs.build.measurements,
            type: this.type,
            images: images
          };

          let urlToPush = (response) => `/dashboard/headway-journals/${trimLocationHeader(response.headers.location)}`;
          this.$store.dispatch('headway/add', data).then((response) => this.$router.push(urlToPush(response)));
        })
        .catch(error => notification.error(getErrorMessage('headway_create', error)));
        return;
      }

      let data = {
        ownerId: JSON.parse(localStorage.getItem('user')).identifier,
        measurements: this.$refs.strength.measurements,
        type: this.type
      };

      let urlToPush = (response) => `/dashboard/headway-journals/${trimLocationHeader(response.headers.location)}`;
      this.$store.dispatch('headway/add', data).then((response) => this.$router.push(urlToPush(response)));
    }
  }
}
