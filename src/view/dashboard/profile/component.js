import ProfileService from "@/service/profile.service"
import {getInitials} from "@/util/user.utils";
import {notification} from "@/util/toastr.utils";

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
    this.fetchOne(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchOne(to.params.id);
    next();
  },
  methods: {
    getInitials(username, displayName) {
      return getInitials({username: username, displayName: displayName})
    },
    fetchOne(id) {
      this.isLoading = true;

      ProfileService.fetchOne({identifier: id})
      .then(response => {
        ProfileService.fetchFollowers({identifier: id}).then(response => this.followers = response.data.followers);
        ProfileService.fetchFollowing({identifier: id}).then(response => this.following = response.data.following);

        this.$store.dispatch('user/get', {identifier: id})
        .then(response => {
          ({username: this.username, displayName: this.displayName, avatar: this.avatar} = response.data)
          this.isLoading = false;
        });

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
      }).catch(() => {
        this.isLoading = false;
        this.$router.back()
      });
    },
    follow() {
      ProfileService.follow({identifier: this.$route.params.id})
      .then(() => {
        this.isFollowing = true;
        notification.success(this.$t('profile.followed') + this.username)
      });
    },
    unfollow() {
      ProfileService.unfollow({identifier: this.$route.params.id})
      .then(() => {
        this.isFollowing = false;
        notification.success(this.$t('profile.unfollowed') + this.username)
      });
    }
  }

}
