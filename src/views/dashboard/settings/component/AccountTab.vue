<template lang="pug">
  .card-body(v-if="$parent.isActive($parent.tabs.account.name)")
    .text-wrap.p-lg-6
      h2.mt-0.mb-4 Account
      p
        | Account content
</template>