export default {
  data: () => ({
    dropdowns: {
      profile: {open: false},
      notification: {open: false},
      mobile: {open: false}
    }
  }),
  methods: {
    toggleDropdown(name) {
      switch (name) {
        case 'notification':
          this.dropdowns.profile.open = false;
          this.dropdowns.notification.open = !this.dropdowns.notification.open;
          break;
        case 'profile':
          this.dropdowns.profile.open = !this.dropdowns.profile.open;
          this.dropdowns.notification.open = false;
          break;
        case 'mobile':
          this.dropdowns.mobile.open = !this.dropdowns.mobile.open;
          this.dropdowns.profile.open = false;
          break;
      }
    },
    closeDropdowns() {
      for (let dropdown in this.dropdowns) {
        this.dropdowns[dropdown].open = false;
      }
    },
    onClick(event) {
      let parentNode = event.target.parentNode;
      if (parentNode && !parentNode.classList.contains('dropdown-element')) {
        this.closeDropdowns();
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.onClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onClick)
  },
  components: {
    Menu: () => import ('./component/Menu'),
    NotificationDropdown: () => import ('./component/NotificationDropdown'),
    ProfileDropdown: () => import('./component/ProfileDropdown')
  }
}