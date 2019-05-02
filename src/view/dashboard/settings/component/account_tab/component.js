import {updateAccountDetails} from '@/service/user.service';
import {notification} from "@/util/toastr.utils";
import {email, maxLength, minLength} from "vuelidate/src/validators";
import {getErrorMessage} from "@/util/validation.utils";

export default {
  data: () => ({
    email: '',
    username: '',
    displayName: null,
    avatar: null,
    language: 'pl'
  }),
  mounted() {
    this.$parent.currentTab = this.$parent.tabs.account.name;

    let user = this.$store.state.user.user;
    this.language = this.$cookie.get('lang') || navigator.language.substring(0, 2) || 'en';
    this.username = user.username;
    this.email = user.email;
    this.avatar = user.avatar;
    this.displayName = user.displayName;
  },
  methods: {
    update() {
      if (this.language !== null) {
        this.$cookie.set('lang', this.language);
      }

      updateAccountDetails({username: this.username, email: this.email, displayName: this.displayName, avatar: this.avatar})
      .then(() => notification.success(this.$t('account_tab.updated')))
      .catch(error => notification.error(getErrorMessage('account_tab', error)))
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  validations: {
    email: {email},
    displayName: {minLength: minLength(3), maxLength: maxLength(32)}
  }
}
