import {notification} from "@/util/toastr.utils";
import i18n from "@/i18n";
import {maxLength, minLength, required, sameAs} from "vuelidate/src/validators";
import {getErrorMessage} from "@/util/validation.utils";
import {changePassword} from "@/service/user.service";
import {NO_SPACE} from "@/util/constants";

export default {
  data: () => ({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }),
  created() {
    this.$parent.currentTab = this.$parent.tabs.password.name;
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  methods: {
    update() {
      changePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword
      })
      .then(() => {
        notification.success(i18n.t('password_tab.updated'));
        this.$router.push('/login');
        this.$store.dispatch('user/logout');
      })
      .catch(error => notification.error(getErrorMessage('password_tab', error)))
    }
  },
  validations: {
    oldPassword: {required},
    newPassword: {NO_SPACE, required, minLength: minLength(6), maxLength: maxLength(64)},
    confirmNewPassword: {required, sameAsNewPassword: sameAs('newPassword')}
  }
}
