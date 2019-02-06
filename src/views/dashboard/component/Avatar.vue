<template lang="pug">
  span.avatar(v-if="isNotNullAndEmpty($store.state.user.user)", :style="{'background-image': `url(${this.$store.state.user.user.avatar})`}")
  span.avatar.avatar-blue(v-else) {{this.getInitials(this.$store.state.user.user)}}
</template>
<script>
  export default {
    methods: {
      isNotNullAndEmpty(user) {
        return user.avatar !== '' && user.avatar !== null;
      },
      getInitials(user) {
        let name = user.displayName || user.username;
        let splittedName = name.split(' ');

        if (splittedName.length >= 2) {
          let firstPart = name.split(' ')[0].substring(0, 1);
          let lastPart = name.split(' ')[splittedName.length - 1].substring(0, 1);

          return (firstPart + lastPart).toUpperCase();
        }

        return name.substring(0, 2);

      }
    }
  }
</script>