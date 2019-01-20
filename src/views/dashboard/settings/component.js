import settingsMenu from '@/assets/menu/settings-menu.json';

export default {
  name: 'settings',
  data: () => ({
    tabs: settingsMenu,
    currentTab: "Account"
  }),
  methods: {
    isActive(tabName) {
      return this.currentTab === tabName;
    }
  },
  components: {
    AccountTab: () => import('./component/AccountTab'),
    TestTab: () => import('./component/TestTab'),
    Tabs: () => import('./component/Tabs')
  }
}