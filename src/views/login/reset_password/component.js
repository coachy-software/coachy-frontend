import {required, minLength, maxLength, sameAs} from "vuelidate/src/validators";
import {notification} from "@/utils/toastr.utils";
import {resetPassword} from "@/service/user.service";
import {NO_SPACE} from "@/utils/constants";

export default {
  name: 'reset-password',
  data: () => ({
    password: "",
    confirmPassword: ""
  }),
  validations: {
    password: {NO_SPACE, required, minLength: minLength(6), maxLength: maxLength(64)},
    confirmPassword: {required, sameAsPassword: sameAs('password')}
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
    resetPassword() {
      resetPassword({token: this.$route.query.token, password: this.password, confirmPassword: this.confirmPassword})
      .then(() => {
        notification.success('Password changed');
        this.$router.push('/login');
      })
      .catch((error) => notification.error(error.message));
    }
  }
}