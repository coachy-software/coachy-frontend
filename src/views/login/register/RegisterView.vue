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
            form#card.card.mt-auto(@submit.prevent="register")
              #card-body.card-body.p-6
                #dimmer.dimmer(:class="{'active': isLoggingIn}")
                  .loader
                  .dimmer-content
                    .card-title Create new account
                    .form-group
                      label.form-label Username
                      input.form-control(:class="{'is-invalid': $v.username.$error}", type="text", id="username", placeholder="Enter username", v-model.trim="$v.username.$model")
                      .invalid-feedback(v-if="!$v.username.required") Field is required
                      .invalid-feedback(v-if="!$v.username.maxLength") Name must have at most 32 letters.
                      .invalid-feedback(v-if="!$v.username.minLength") Username must have at least 3 letters.
                    .form-group
                      label.form-label Password
                      input.form-control(:class="{'is-invalid': $v.password.$error}", type="password", id="password", placeholder="Enter password", v-model.trim="$v.password.$model")
                      .invalid-feedback(v-if="!$v.password.required") Field is required
                      .invalid-feedback(v-if="!$v.password.minLength") Password must have at least 6 letters.
                      .invalid-feedback(v-if="!$v.password.maxLength") Name must have at most 64 letters.
                    .form-group
                      label.form-label Confirm password
                      input.form-control(:class="{'is-invalid': $v.confirmPassword.$error}", type="password", id="confirm-password", placeholder="Confirm password", v-model.trim="$v.confirmPassword.$model")
                      .invalid-feedback(v-if="!$v.confirmPassword.sameAsPassword") Passwords must be identical.
                    .form-group
                      label.form-label Email
                      input.form-control(:class="{'is-invalid': $v.email.$error}", type="email", id="email", placeholder="Enter email", v-model.trim="$v.email.$model")
                      .invalid-feedback(v-if="!$v.email.email") Must be a well-formed email address.
                    .form-group
                      label.form-label Account type #[p#badge.badge.badge-primary COACH / CHARGE]
                      #selectgroup.selectgroup.w-100
                        label.selectgroup-item
                          input.selectgroup-input(type="radio", name="value", value="COACH", v-model="accountType")
                          span#btn1.selectgroup-button.selectgroup-button-icon
                            i#fas.fas.fa-chalkboard-teacher
                        label.selectgroup-item
                          input.selectgroup-input(type="radio", name="value", value="CHARGE", checked, v-model="accountType")
                          span#btn2.selectgroup-button.selectgroup-button-icon
                            i#fas2.fas.fa-dumbbell
                    .form-group
                      label#custom-control.custom-control.custom-checkbox
                        input.custom-control-input(type="checkbox", v-model="policy" required)
                        span.custom-control-label Agree the #[router-link(to="/privacy-policy") terms and policy]
                    .form-footer
                      button#submit.btn.btn-primary.btn-block(type="submit", :disabled="isInvalid") Sign in
              #signup.text-center.text-muted
                p.
                  Already have account? #[router-link(to="/login") Sign in]
</template>

<style scoped>
  @import url(~tabler-ui/dist/assets/css/tabler.css);
  @import url('https://use.fontawesome.com/releases/v5.6.3/css/solid.css');
  @import url('https://use.fontawesome.com/releases/v5.6.3/css/fontawesome.css');
</style>

<script>
  import {notification} from "@/utils/toastr.utils";
  import {required, maxLength, minLength, email, sameAs} from "vuelidate/src/validators";

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
          "username": this.username,
          "password": this.password,
          "matchingPassword": this.confirmPassword,
          "email": this.email,
          "accountType": this.accountType
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
      isLoggingIn() {
        return this.$store.getters.isLoggingIn;
      },
      isInvalid() {
        return this.$v.$invalid;
      }
    },
    validations: {
      username: {required, minLength: minLength(3), maxLength: maxLength(32)},
      password: {required, minLength: minLength(6), maxLength: maxLength(64)},
      confirmPassword: {required, sameAsPassword: sameAs('password')},
      email: {required, email}
    }
  }
</script>