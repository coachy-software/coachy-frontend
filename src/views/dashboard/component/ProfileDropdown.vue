<template lang="pug">
  .dropdown.dropdown-element(@click="$parent.toggleDropdown('profile')", :class="{'show': this.$parent.dropdowns.profile.open}")
    a.nav-link.pr-0.leading-none.dropdown-element
      span.avatar
      span.ml-2.d-none.d-lg-block.dropdown-element
        span.text-default {{this.name}}
        small.text-muted.d-block.mt-1 {{this.accountType}}
    .dropdown-menu.dropdown-menu-right.dropdown-menu-arrow(:class="{'show': this.$parent.dropdowns.profile.open}")
      div(v-for="value in menu")
        router-link.dropdown-item(:to="value.link")
          i.dropdown-icon(:class="value.icon")
          |  {{value.name}}
        .dropdown-divider(v-if="value.divider")
</template>

<script>
  import menu from '@/assets/menu/profile-menu.json';
  import store from '@/store';

  export default {
    data: () => ({
      menu: menu,
      name: store.getters.user.username || 'N/A',
      accountType: store.getters.user.accountType || 'N/A'
    })
  }
</script>