import {updateAccountDetails} from '@/service/user.service';
import {notification} from "@/utils/toastr.utils";

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
      .then(() => notification.success('Updated'))
      .catch(error => notification.error(error.message))
    }
  }
}