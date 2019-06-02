<template lang="pug">
  .dropdown.d-none.d-md-flex.dropdown-element(:class="{'show': this.$parent.dropdowns.notification.open}", @click="$parent.toggleDropdown('notification')")
    .a.nav-link.icon.dropdown-element
      i.fe.fe-bell
      span.nav-unread
    .dropdown-menu.dropdown-menu-right.dropdown-menu-arrow(:class="{'show': this.$parent.dropdowns.notification.open}")
      div(v-if="notifications.length === 0")
        p.text-center.mt-2 {{$t('dropdowns.no_notifications')}}
      div(v-else, v-for="notification in notifications")
        template(v-if="notification.type === 'ALERT'")
          router-link.dropdown-item.d-flex(to="javascript:;")
            span.avatar.mr-3.align-self-center(:style="{'background-image': `url(${logo})`}")
            div
              |  {{notification.content}}
              .small.text-muted {{notification.createdAt | moment}}
        template(v-else)
          router-link.dropdown-item.d-flex(to="javascript:;")
            span.avatar.mr-3.align-self-center.dropdown-avatar(:style="{'background-image': `url(${notification.senderAvatar})`}")
            .wrap-content Otrzymałeś plan treningowy od użytkownika #[strong {{notification.senderName}}] czy chcesz go zaakceptować?
            button.btn.btn-icon.btn-primary.btn-secondary(type='button')
              i.fe.fe-check
            button.btn.btn-icon.btn-primary.btn-secondary.ml-1(type='button')
              i.fe.fe-x
      .dropdown-divider
      router-link.dropdown-item.text-center.text-muted-dark(to="/") {{$t('dropdowns.see_all')}}
</template>
<style scoped>
  .dropdown-item.active, .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #f8f9fa !important;
  }

  .dropdown-menu {
    width: 30rem;
  }

  .dropdown-avatar {
    min-width: 2rem !important;
    min-height: 2rem !important;
    height: 2rem !important;
    width: 2rem !important;
  }

  .wrap-content {
    overflow-wrap: break-word !important;
    word-wrap: break-word !important;
    white-space: normal !important;;
  }
</style>
<script>
  import {subscribe} from "@/service/ws";
  import moment from "moment";
  import logo from "@/assets/dark-logo.svg";

  export default {
    data: () => ({
      notifications: [],
      logo: logo
    }),
    created() {
      subscribe('/user/queue/notifications', (output) => this.notifications.push(JSON.parse(output.body)));
    },
    filters: {
      moment: (date) => {
        return moment(date).format('DD-MM-YYYY HH:mm:ss');
      }
    }
  }
</script>
