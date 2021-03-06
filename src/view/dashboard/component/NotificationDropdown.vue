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
          router-link.dropdown-item.d-flex(:to="'/dashboard' + parseAlertContent(notification.content).link")
            span.avatar.mr-3.align-self-center.dropdown-avatar(:style="{'background-image': `url(${logo})`}")
            .wrap-content #[strong {{notification.senderName}}] {{translateAlert(notification.content)}}
              .small.text-muted {{notification.createdAt | moment}}
        template(v-else)
          .dropdown-item.d-flex
            span.avatar.mr-3.align-self-center.dropdown-avatar(v-if="notification.senderAvatar !== null", :style="{'background-image': `url(${notification.senderAvatar})`}")
            span.avatar.mr-3.align-self-center.dropdown-avatar.avatar-blue(v-else) {{getInitials(notification.senderName)}}
            .wrap-content {{$t('notifications.schedule-alert-1')}} #[strong {{notification.senderName}}] {{$t('notifications.schedule-alert-2')}}
            button.btn.btn-icon.btn-primary.btn-secondary(type='button', @click="accept(notification.content)")
              i.fe.fe-check
            button.btn.btn-icon.btn-primary.btn-secondary.ml-1(type='button', @click="reject(notification.content)")
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
  import moment from "moment";
  import logo from "@/assets/dark-logo.svg";
  import chatNotificationSound from "@/assets/sounds/chat.mp3";
  import {Howl, Howler} from "howler";
  import NotificationService from "@/service/notifications.service";
  import ScheduleService from "@/service/schedule.service";
  import {getInitials} from "@/util/user.utils";
  import {notification} from "@/util/toastr.utils";
  import WebsocketService from "@/service/ws";

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
      .then(response => {
        this.hasAnyUnread = response.data.hasUnread;
        localStorage.setItem('unreadNotifications', JSON.stringify(response.data));
      });

      NotificationService.fetchAll({identifier: this.userIdentifier, page: 0, size: 5})
      .then(response => this.notifications = response.data.content);

      WebsocketService.subscribe('/user/queue/notifications', (output) => {
        this.notifications.push(JSON.parse(output.body));
        this.hasAnyUnread = true;

        let unreadNotifications = JSON.parse(localStorage.getItem('unreadNotifications'));
        unreadNotifications.hasUnread = true;
        unreadNotifications.count += 1;

        localStorage.setItem('unreadNotifications', JSON.stringify(unreadNotifications));

        this.playNotificationSound();
      });
    },
    computed: {
      sortedNotifications() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
      }
    },
    filters: {
      moment: (date) => {
        return moment(date).format('DD-MM-YYYY HH:mm:ss');
      }
    },
    methods: {
      translateAlert(alertContent) {
        let text = this.parseAlertContent(alertContent).text;
        return this.$te('notifications.' + text) ? this.$t('notifications.' + text) : text;
      },
      parseAlertContent(alertContent) {
        return JSON.parse(alertContent);
      },
      accept(notificationContent) {
        let content = JSON.parse(notificationContent);
        ScheduleService.accept({identifier: content.scheduleId, token: content.token})
        .then(() => notification.success(this.$t('notifications.accepted')))
        .catch(() => notification.error(this.$t('notifications.already_voted')));
      },
      reject(notificationContent) {
        let content = JSON.parse(notificationContent);

        ScheduleService.reject({identifier: content.scheduleId, token: content.token})
        .then(() => notification.success(this.$t('notifications.rejected')))
        .catch(() => notification.error(this.$t('notifications.already_voted')));
      },
      toggleDropdown() {
        this.$parent.toggleDropdown('notification');
        this.hasAnyUnread = false;

        let notificationDropdown = document.getElementById('notification-dropdown');

        if (!notificationDropdown.classList.contains('show')) {
          NotificationService.markAsRead({identifier: this.userIdentifier})
          .then(() => {
            this.hasAnyUnread = false;
            localStorage.setItem('unreadNotifications', JSON.stringify({hasUnread: false}));
          })
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
