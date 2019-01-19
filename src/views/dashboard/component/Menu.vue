<template lang="pug">
  .col-lg.order-lg-first
    ul.nav.nav-tabs.border-0.flex-column.flex-lg-row
      div(v-for="item in menu")
        li.nav-item(v-if="item.type === 'NORMAL'")
          router-link.nav-link.active(:to="item.link")
            i(:class="item.icon")
            |  Home
        div(v-if="item.type === 'DROPDOWN'")
          li.nav-item(@mouseover="showDropdown(item.name)", @mouseleave="hideDropdown(item.name)", :id="item.name")
            a.nav-link
              i(:class="item.icon")
              |  {{item.name}}
            .dropdown-menu(:id="'menu' + item.name")
              div(v-for="dropdownItem in item.dropdown")
                router-link.dropdown-item(:to="dropdownItem.link", @click="hideDropdown(item.name)") {{dropdownItem.name}}
</template>

<style scoped>
  .dropdown-menu {
    margin-top: 0;
  }
</style>

<script>
  import DashboardMenu from '@/assets/menu/dashboard-menu.json';

  export default {
    data: () => ({
      menu: DashboardMenu,
    }),
    methods: {
      showDropdown(name) {
        document.getElementById(name).classList.add('show');
        document.getElementById(`menu${name}`).classList.add('show');
      },
      hideDropdown(name) {
        document.getElementById(name).classList.remove('show');
        document.getElementById(`menu${name}`).classList.remove('show');
      }
    }
  }
</script>
