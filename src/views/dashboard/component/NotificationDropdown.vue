<template lang="pug">
  .dropdown.d-none.d-md-flex.dropdown-element(:class="{'show': this.$parent.dropdowns.notification.open}", @click="$parent.toggleDropdown('notification')")
    .a.nav-link.icon.dropdown-element
      i.fe.fe-bell
      span.nav-unread
    .dropdown-menu.dropdown-menu-right.dropdown-menu-arrow(:class="{'show': this.$parent.dropdowns.notification.open}")
      div(v-for="value in notifications")
        router-link.dropdown-item.d-flex(:to="value.link")
          span.avatar.mr-3.align-self-center(:style="{'background-image': `url(${value.avatar})`}")
          div
            strong {{value.author}}
            |  {{value.message}}
            .small.text-muted {{value.time}}
      .dropdown-divider
      router-link.dropdown-item.text-center.text-muted-dark(to='/') {{$t('dropdowns.mark_all')}}
</template>

<script>
  import notificationMock from '@/assets/mock/notification-mock.json';

  export default {
    data: () => ({
      notifications: notificationMock
    })
  }
</script>
