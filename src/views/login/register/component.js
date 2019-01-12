/*
 * MIT License
 *
 * Copyright (c) 2018 Coachy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {notification} from "@/utils/toastr.utils";
import {required, maxLength, minLength, email, sameAs, helpers} from "vuelidate/src/validators";
import {NO_SPACE, NO_SPACE_AND_SPECIAL_CHARS} from "@/utils/constants";

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
        notification.success('Successfully registered');
      })
      .catch((error) => {
        notification.error(error.message);
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
    username: {NO_SPACE_AND_SPECIAL_CHARS, required, minLength: minLength(3), maxLength: maxLength(32)},
    password: {NO_SPACE, required, minLength: minLength(6), maxLength: maxLength(64)},
    confirmPassword: {required, sameAsPassword: sameAs('password')},
    email: {required, email}
  }
}