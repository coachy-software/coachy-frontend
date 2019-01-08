<template lang="pug">
  .page
    .page-singlel
      .container
        .row
          #col.col.col-login.mx-auto
            #logo.text-center
              img(src="@/assets/dark-logo.svg")
            form.card.mt-auto
              #card-body.card-body.p-6
                .card-title Login to your account
                .form-group
                  label.form-label Username
                  input.form-control(type="text", id="username", placeholder="Enter username")
                .form-group
                  label.form-label Password
                    a#float-right.float-right.small(href="#") I forgot password
                  input.form-control(type="password", id="password", placeholder="Enter password")
                .form-group
                  label#rememberme.custom-control.custom-checkbox
                    input.custom-control-input(type="checkbox")
                    span.custom-control-label Remember me
                .form-footer
                  button#submit.btn.btn-primary.btn-block(type="submit") Sign in
              #signup.text-center.text-muted
                p.
                  Don't have account yet? #[a(href="#") Sing up]
</template>

<script>
  export default {
    name: 'login'
  }
</script>