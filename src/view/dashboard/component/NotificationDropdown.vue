<template lang="pug">
  .dropdown.d-none.d-md-flex.dropdown-element(id="notification-dropdown", :class="{'show': this.$parent.dropdowns.notification.open}", @click="toggleDropdown")
    .a.nav-link.icon.dropdown-element
      i.fe.fe-bell
      span.nav-unread(v-show="hasAnyUnread")
    .dropdown-menu.dropdown-menu-right.dropdown-menu-arrow(:class="{'show': this.$parent.dropdowns.notification.open}")
      div(v-if="notifications.length === 0")
        p.text-center.mt-2 {{$t('dropdowns.no_notifications')}}
      div(v-else, v-for="notification in sortedNotifications")
        template(v-if="notification.type === 'ALERT'")
          .dropdown-item.d-flex
            span.avatar.mr-3.align-self-center.dropdown-avatar(:style="{'background-image': `url(${logo})`}")
            .wrap-content {{notification.content}}
              .small.text-muted {{notification.createdAt | moment}}
        template(v-else)
          .dropdown-item.d-flex
            span.avatar.mr-3.align-self-center.dropdown-avatar(v-if="notification.senderAvatar !== null", :style="{'background-image': `url(${notification.senderAvatar})`}")
            span.avatar.mr-3.align-self-center.dropdown-avatar.avatar-blue(v-else) {{getInitials(notification.senderName)}}
            .wrap-content Otrzymałeś plan treningowy od użytkownika #[strong {{notification.senderName}}] czy chcesz go zaakceptować?
            button.btn.btn-icon.btn-primary.btn-secondary(type='button')
              i.fe.fe-check
            button.btn.btn-icon.btn-primary.btn-secondary.ml-1(type='button')
              i.fe.fe-x
      .dropdown-divider
      router-link.dropdown-item.text-center.text-muted-dark(to="/dashboard/notifications") {{$t('dropdowns.see_all')}}
</template>
<style scoped>
  .dropdown-item.active, .dropdown-item:active, .dropdown-item:focus {
    color: #16181b !important;
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

    overflow: hidden;
    text-overflow: ellipsis;
  }


</style>
<script>
  import {subscribe} from "@/service/ws";
  import moment from "moment";
  import logo from "@/assets/dark-logo.svg";
  import chatNotificationSound from "@/assets/sounds/chat.mp3";
  import {Howl, Howler} from "howler";
  import NotificationService from "@/service/notifications.service";
  import {getInitials} from "@/util/user.utils";

  export default {
    data: () => ({
      notifications: [],
      logo: logo,
      hasAnyUnread: false,
      userIdentifier: {}
    }),
    created() {
      this.userIdentifier = JSON.parse(localStorage.getItem('user')).identifier;

      NotificationService.hasAnyUnread({identifier: this.userIdentifier})
      .then(response => this.hasAnyUnread = response.data.hasUnread);

      NotificationService.fetchAll({identifier: this.userIdentifier, page: 0, size: 5})
      .then(response => this.notifications = response.data.content);

      subscribe('/user/queue/notifications', (output) => {
        this.notifications.push(JSON.parse(output.body));
        this.hasAnyUnread = true;
        this.playNotificationSound();
      });
    },
    computed: {
      sortedNotifications() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).filter((notification, index) => index <= 4);
      }
    },
    filters: {
      moment: (date) => {
        return moment(date).format('DD-MM-YYYY HH:mm:ss');
      }
    },
    methods: {
      toggleDropdown() {
        this.$parent.toggleDropdown('notification');
        this.hasAnyUnread = false;

        let notificationDropdown = document.getElementById('notification-dropdown');

        if (!notificationDropdown.classList.contains('show')) {
          NotificationService.markAsRead({identifier: this.userIdentifier})
          .then(() => this.hasAnyUnread = false)
        }
      },
      getInitials(username) {
        return getInitials({username: username});
      },
      playNotificationSound() {
        const sound = new Howl({src: [chatNotificationSound]});

        sound.play();
        Howler.volume(0.3);
      }
    }
  }
</script>
