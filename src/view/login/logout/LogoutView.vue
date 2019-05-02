<template>
  <h1></h1>
</template>

<script>
  import {notification} from "@/util/toastr.utils";

  export default {
    name: 'logout',
    mounted() {
      this.$store.dispatch('user/logout')
      .then(() => {
        notification.success(this.$t('logout.logged_out'));
        this.$router.push('/login');
      });
    }
  }
</script>
