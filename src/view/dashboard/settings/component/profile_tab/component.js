import {url, maxLength} from "vuelidate/src/validators";
import ProfileService from "@/service/profile.service";
import {notification} from "@/util/toastr.utils";
import axios from "axios";
import {API_URL} from "@/util/constants";
import {multipartHeader} from "@/util/headers";
import {obtainImage} from "@/util/file.utils";

export default {
  data: () => ({
    location: '',
    website: '',
    bio: '',
    title: '',
    socialLinks: [
      {name: 'Instagram', link: ''},
      {name: 'Facebook', link: ''},
      {name: 'Twitter', link: ''}
    ],
    bannerUrl: '',
    services: [],
    userIdentifier: JSON.parse(localStorage.getItem('user')).identifier,
    isLoading: false,
    serviceToAdd: '',
    resetBanner: false
  }),
  created() {
    this.isLoading = true;

    ProfileService.fetchOne({identifier: this.userIdentifier})
    .then(response => {
      ({
        location: this.location,
        website: this.website,
        bio: this.bio,
        title: this.title,
        socialLinks: this.socialLinks,
        bannerUrl: this.bannerUrl,
        services: this.services
      } = response.data);

      this.socialLinks = this.socialLinks.sort();
      this.isLoading = false;
    })
  },
  mounted() {
    this.$parent.currentTab = this.$parent.tabs.profile.name;
  },
  methods: {
    update() {
      this.isLoading = true;
      let files = this.$refs.file.files;

      if (files.length === 1) {
        axios.post(`${API_URL}/uploads`, obtainImage(files[0], 'banners'), multipartHeader())
        .then(response => {
          this.bannerUrl = response.headers.location;
          this.handleUpdate();
        });
        return;
      }

      this.handleUpdate();
    },
    handleUpdate() {
      ProfileService.update({
        identifier: this.userIdentifier,
        location: this.location,
        website: this.website,
        bio: this.bio,
        title: this.title,
        socialLinks: this.socialLinks.sort(),
        bannerUrl: this.resetBanner ?  '' : this.bannerUrl,
        services: this.services
      }).then(() => {
        this.isLoading = false;
        notification.success(this.$t('profile.updated'))
      });
    },
    addService() {
      if (this.serviceToAdd.length !== 0) {
        this.services.push(this.serviceToAdd);
        this.serviceToAdd = '';
      }
    },
    removeService(name) {
      this.services = this.services.filter(service => service !== name);
    }
  },
  validations: {
    website: {url},
    bio: {maxLength: maxLength(500)}
  }
}
