<template lang="pug">
  span.avatar(v-if="isNotNullAndEmpty($store.state.user.user)", :style="{'background-image': `url(${this.$store.state.user.user.avatar})`}")
  span.avatar.avatar-blue(v-else) {{this.getInitials(this.$store.state.user.user)}}
</template>
<script>
  import {getInitials} from "@/utils/user.utils";

  export default {
    methods: {
      isNotNullAndEmpty(user) {
        return user.avatar !== '' && user.avatar !== null;
      },
      getInitials(user) {
        return getInitials(user);
      }
    }
  }
</script>
