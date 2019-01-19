<template>

</template>

<script>
  import {notification} from "@/utils/toastr.utils";

  export default {
    name: 'logout',
    mounted() {
      this.$store.dispatch('user/logout')
      .then(() => {
        notification.success('Logged out!');
        this.$router.push('/login');
      });
    }
  }
</script>