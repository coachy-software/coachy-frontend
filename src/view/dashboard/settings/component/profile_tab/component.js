import {url, maxLength} from "vuelidate/src/validators";
import ProfileService from "@/service/profile.service";
import {notification} from "@/util/toastr.utils";

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
    serviceToAdd: ''
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

      ProfileService.update({
        identifier: this.userIdentifier,
        location: this.location,
        website: this.website,
        bio: this.bio,
        title: this.title,
        socialLinks: this.socialLinks.sort(),
        bannerUrl: this.bannerUrl,
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
