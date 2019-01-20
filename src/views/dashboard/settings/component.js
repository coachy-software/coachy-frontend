export default {
  name: 'settings',
  data: () => ({
    tabs: {
      account: 'TAB_ACCOUNT',
      test: 'TAB_TEST'
    },
    currentTab: "TAB_ACCOUNT"
  }),
  methods: {
    isActive(tabName) {
      return this.currentTab === tabName;
    }
  },
  components: {
    AccountTab: () => import('./component/AccountTab'),
    TestTab: () => import('./component/TestTab'),
  }
}