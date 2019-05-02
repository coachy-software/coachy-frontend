<template lang="pug">
  .list-group.list-group-transparent.mb-0
    div(v-for="tab in $parent.tabs")
      router-link.list-group-item.list-group-item-action(:style="tab.style", :to="tab.link", :class="{'active': $parent.isActive(tab.name)}")
        span.icon.mr-3
          i(:class="tab.icon")
        | {{ tab.name }}
</template>
