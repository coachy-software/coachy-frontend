import ProfileService from "@/service/profile.service"
import {getInitials} from "../../../util/user.utils";

export default {
  data: () => ({
    username: '',
    displayName: '',
    avatar: '',
    website: '',
    title: '',
    bio: '',
    bannerUrl: '',
    location: '',
    services: [],
    socialLinks: [],
    isFollowing: false,
    isProfileOwner: false,
    followers: [],
    following: [],
    isLoading: true
  }),
  created() {
    ProfileService.fetchOne({identifier: this.$route.params.id})
    .then(response => {
      this.$store.dispatch('user/get', {identifier: this.$route.params.id})
      .then(response => ({username: this.username, displayName: this.displayName, avatar: this.avatar} = response.data));

      let result = response.data;
      let user = JSON.parse(localStorage.getItem('user'));

      this.isFollowing = result.followers.includes(user.identifier);
      this.isProfileOwner = result.userId === user.identifier;

      ({
        website: this.website,
        title: this.title,
        bio: this.bio,
        bannerUrl: this.bannerUrl,
        location: this.location,
        services: this.services,
        socialLinks: this.socialLinks
      } = result);

      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
      this.$router.back()
    });
  },
  methods: {
    getInitials() {
      return getInitials({username: this.username, displayName: this.displayName})
    }
  }

}
