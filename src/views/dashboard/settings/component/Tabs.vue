<template lang="pug">
  .list-group.list-group-transparent.mb-0
    div(v-for="tab in $parent.tabs")
      a.list-group-item.list-group-item-action(href="javascript:;", :class="{'active': $parent.isActive(tab.name)}", @click="$parent.currentTab = tab.name")
        span.icon.mr-3
          i(:class="tab.icon")
        | {{ tab.name }}
</template>