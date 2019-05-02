import {notification} from "@/util/toastr.utils";
import {required, maxLength, minLength, email, sameAs} from "vuelidate/src/validators";
import {NO_SPACE, NO_SPACE_AND_SPECIAL_CHARS} from "@/util/constants";
import {getErrorMessage} from "@/util/validation.utils";

export default {
  name: 'register',
  data: () => ({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    accountType: "CHARGE",
    policy: true
  }),
  methods: {
    register() {
      this.$store.dispatch('user/register', {
        username: this.username,
        password: this.password,
        matchingPassword: this.confirmPassword,
        email: this.email,
        accountType: this.accountType
      })
      .then(() => {
        this.$router.push("/login");
        notification.success(this.$t('register.registered'));
      })
      .catch((error) => notification.error(getErrorMessage('register', error)))
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    },
    isInvalid() {
      return this.$v.$invalid;
    }
  },
  validations: {
    username: {NO_SPACE_AND_SPECIAL_CHARS, required, minLength: minLength(3), maxLength: maxLength(32)},
    password: {NO_SPACE, required, minLength: minLength(6), maxLength: maxLength(64)},
    confirmPassword: {required, sameAsPassword: sameAs('password')},
    email: {required, email}
  }
}
