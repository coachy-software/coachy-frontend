import ProfileService from "@/service/profile.service";
import {getInitials} from "@/util/user.utils";
import {notification} from "@/util/toastr.utils";
import moment from "moment";
import ShareModal from "./modals/ShareModal";
import AddRecommendationModal from "./modals/AddRecommendationModal";
import ChangeVisibilityModal from "./modals/ChangeVisibilityModal";
import RequestRevisionModal from "./modals/RequestRevisionModal";

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
    recommendations: [],
    isFollowing: false,
    isProfileOwner: false,
    followers: [],
    following: [],
    isLoading: true
  }),
  components: {
    ShareModal,
    AddRecommendationModal,
    ChangeVisibilityModal,
    RequestRevisionModal
  },
  created() {
    this.fetchOne(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchOne(to.params.id);
    next();
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  },
  methods: {
    getInitials(username, displayName) {
      return getInitials({username: username, displayName: displayName})
    },
    updateRecommendations(recommendations) {
      this.recommendations = recommendations;
    },
    fetchOne(id) {
      this.isLoading = true;
      this.recommendations = [];

      ProfileService.fetchOne({identifier: id})
      .then(response => {
        ProfileService.fetchFollowers({identifier: id}).then(response => this.followers = response.data.followers);
        ProfileService.fetchFollowing({identifier: id}).then(response => this.following = response.data.following);
        ProfileService.fetchRecommendations({identifier: id}).then(response => this.recommendations = response.data);

        let result = response.data;
        let user = JSON.parse(localStorage.getItem('user'));

        this.isFollowing = result.followers.includes(user.identifier);
        this.isProfileOwner = result.userId === user.identifier;

        ({
          username: this.username,
          displayName: this.displayName,
          avatar: this.avatar,
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
        this.$router.back();
      });
    },
    follow() {
      ProfileService.follow({identifier: this.$route.params.id})
      .then(() => {
        this.isFollowing = true;
        this.followers.push(JSON.parse(localStorage.getItem('user')));
        notification.success(this.$t('profile.followed') + this.username);
      });
    },
    unfollow() {
      ProfileService.unfollow({identifier: this.$route.params.id})
      .then(() => {
        this.isFollowing = false;
        this.followers = this.followers.filter(follower => follower.identifier !== JSON.parse(localStorage.getItem('user')).identifier);
        notification.success(this.$t('profile.unfollowed') + this.username);
      });
    },
    toggleMoreMenu() {
      document.getElementById('more_menu').classList.toggle('show');
    }
  }

}
