import {required, email} from "vuelidate/src/validators";
import {notification} from "@/utils/toastr.utils";
import {createResetPasswordToken} from "@/service/user.service.js";

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
      .then(() => notification.success('Email successfully sent'))
      .catch((error) => notification.error(error.message));
    }
  }
}