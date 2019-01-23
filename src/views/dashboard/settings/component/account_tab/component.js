import {updateAccountDetails} from '@/service/user.service';
import {notification} from "@/utils/toastr.utils";
import {email, maxLength, minLength} from "vuelidate/src/validators";
import {getErrorMessage} from "@/utils/validation.utils";

export default {
  data: () => ({
    email: null,
    displayName: null,
    language: null
  }),
  mounted() {
    this.$parent.currentTab = this.$parent.tabs.account.name;
  },
  methods: {
    update() {
      if (this.language !== null) {
        this.$cookie.set('lang', this.language);
      }

      updateAccountDetails({email: this.email, displayName: this.displayName})
      .then(() => notification.success(this.$t('account_tab.updated')))
      .catch(error => notification.error(getErrorMessage('account_tab', error)))
    }
  },
  validations: {
    email: {email},
    displayName: {minLength: minLength(3), maxLength: maxLength(32)}
  }
}