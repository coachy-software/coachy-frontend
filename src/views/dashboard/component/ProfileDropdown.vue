<template lang="pug">
  .dropdown.dropdown-element(@click="$parent.toggleDropdown('profile')", :class="{'show': this.$parent.dropdowns.profile.open}")
    a.nav-link.pr-0.leading-none.dropdown-element
      span.avatar
      span.ml-2.d-none.d-lg-block.dropdown-element
        span.text-default Bartłomiej Stefański
        small.text-muted.d-block.mt-1 Coach
    .dropdown-menu.dropdown-menu-right.dropdown-menu-arrow(:class="{'show': this.$parent.dropdowns.profile.open}")
      div(v-for="value in menu")
        router-link.dropdown-item(:to="value.link")
          i.dropdown-icon(:class="value.icon")
          |  {{value.name}}
        .dropdown-divider(v-if="value.divider")
</template>

<script>
  import menu from '@/assets/menu/profile-menu.json';

  export default {
    data: () => ({
      menu: menu
    })
  }
</script>