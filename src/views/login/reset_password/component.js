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

import {required, minLength, maxLength} from "vuelidate/src/validators";
import {notification} from "@/utils/toastr.utils";
import {resetPassword} from "@/service/user.service";

export default {
  name: 'reset-password',
  data: () => ({
    password: ""
  }),
  validations: {
    password: {required, minLength: minLength(6), maxLength: maxLength(64)}
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
      resetPassword({token: this.$route.query.token, password: this.password})
      .then(() => {
        notification.success('Password changed');
        this.$router.push('/login');
      })
      .catch((error) => notification.error(error.message));
    }
  }
}