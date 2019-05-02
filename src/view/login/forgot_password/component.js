import {required, email} from "vuelidate/src/validators";
import {notification} from "@/util/toastr.utils";
import {createResetPasswordToken} from "@/service/user.service.js";
import {getErrorMessage} from "@/util/validation.utils";

export default {
  name: 'forgot-password',
  data: () => ({
    email: ""
  }),
  validations: {
    email: {required, email}
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    },
    isInvalid() {
      return this.$v.$invalid;
    }
  },
  methods: {
    createToken() {
      createResetPasswordToken({email: this.email})
      .then(() => notification.success(this.$t('forgot_password.email_sent')))
      .catch((error) => notification.error(getErrorMessage('forgot_password', error)));
    }
  }
}
