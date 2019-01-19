import {notification} from "@/utils/toastr.utils";
import {helpers, required} from "vuelidate/src/validators";
import {NO_SPACE, NO_SPACE_AND_SPECIAL_CHARS} from "@/utils/constants";

export default {
  name: 'login',
  data: () => ({
    username: "",
    password: ""
  }),
  methods: {
    login() {
      this.$store.dispatch('user/login', {username: this.username, password: this.password})
      .then(() => {
        this.$router.push("/dashboard");
        notification.success('Logged in');
      })
      .catch(() => {
        notification.error('Bad credentials')
      })
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
    username: {NO_SPACE_AND_SPECIAL_CHARS, required},
    password: {NO_SPACE, required}
  }
}