<!--
  - MIT License
  -
  - Copyright (c) 2018 Coachy
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template lang="pug">
  .page
    .page-singlel
      .container
        .row
          #col.col.col-login.mx-auto
            #logo.text-center
              img(src="@/assets/dark-logo.svg")
            form.card.mt-auto(@submit.prevent="login")
              #card-body.card-body.p-6
                #dimmer.dimmer(:class="{'active': isLoggingIn}")
                  .loader
                  .dimmer-content
                    .card-title Login to your account
                    .form-group
                      label.form-label Username
                      input.form-control(:class="{'is-invalid': !$v.username.required}", type="text", id="username", placeholder="Enter username", v-model.trim="$v.username.$model")
                      .invalid-feedback(v-if="!$v.username.required") Field is required
                    .form-group
                      label.form-label Password
                        a#float-right.float-right.small(href="#") I forgot password
                      input.form-control(:class="{'is-invalid': !$v.password.required}", type="password", id="password", placeholder="Enter password", v-model.trim="$v.password.$model")
                      .invalid-feedback(v-if="!$v.password.required") Field is required
                    .form-group
                      label#rememberme.custom-control.custom-checkbox
                        input.custom-control-input(type="checkbox")
                        span.custom-control-label Remember me
                    .form-footer
                      button#submit.btn.btn-primary.btn-block(type="submit", :disabled="isInvalid") Sign in
              #signup.text-center.text-muted
                p.
                  Don't have account yet? #[a(href="#") Sing up]
</template>

<script>
  import {notification} from "@/utils/toastr.utils";
  import {required} from "vuelidate/src/validators";

  export default {
    name: 'login',
    data: () => ({
      username: "",
      password: ""
    }),
    methods: {
      login() {
        this.$store.dispatch('login', this)
        .then(() => {
          this.$router.push("/");
          notification.success('Zalogowano pomyślnie');
        })
        .catch(() => {
          notification.error('Niepoprawny login lub hasło')
        })
      }
    },
    computed: {
      isLoggingIn() {
        return this.$store.getters.isLoggingIn;
      },
      isInvalid() {
        return this.$v.$invalid;
      }
    },
    validations: {
      username: {required},
      password: {required}
    }
  }
</script>