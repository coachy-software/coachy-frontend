import {notification} from "@/utils/toastr.utils";
import store from '@/store';
import {updateAccountDetails} from '@/service/user.service';
import i18n from "@/i18n";
import {maxLength} from "vuelidate/src/validators";
import {getErrorMessage} from "@/utils/validation.utils";

export default {
  data: () => ({
    username: '',
  }),
  created() {
    this.$parent.currentTab = this.$parent.tabs.login.name;
    this.username = store.state.user.user.username;
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  methods: {
    update() {
      let user = store.state.user.user;

      updateAccountDetails({
        username: this.username,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar
      })
      .then(() => {
        notification.success(i18n.t('login_tab.updated'));
        this.$router.push('/login');
        this.$store.dispatch('user/logout');
      })
      .catch(error => notification.error(getErrorMessage('login_tab', error)))
    }
  },
  validations: {
    username: {
      maxLength: maxLength(32)
    }
  }
}
