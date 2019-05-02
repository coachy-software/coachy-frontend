<template lang="pug">
  .my-3.my-md-5
    .container
      .page-header
        h1.page-title
          | {{this.$t('settings.page_title')}}
      .row
        .col-lg-3.order-lg-1.mb-4
          Tabs
        .col-lg-9
          .card
            router-view
</template>
<script>
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
      Tabs: () => import('./component/Tabs')
    }
  }
</script>