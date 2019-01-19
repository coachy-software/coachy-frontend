<!--
  - MIT License
  -
  - Copyright (c) 2018 Coachy
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template lang="pug">
  .dropdown.dropdown-element(@click="$parent.toggleDropdown('profile')", :class="{'show': this.$parent.dropdowns.profile.open}")
    a.nav-link.pr-0.leading-none.dropdown-element
      span.avatar
      span.ml-2.d-none.d-lg-block.dropdown-element
        span.text-default Bartłomiej Stefański
        small.text-muted.d-block.mt-1 Coach
    .dropdown-menu.dropdown-menu-right.dropdown-menu-arrow(:class="{'show': this.$parent.dropdowns.profile.open}")
      div(v-for="value in menu")
        a.dropdown-item
          i.dropdown-icon(:class="value.icon")
          |  {{value.name}}
        .dropdown-divider(v-if="value.divider")
</template>

<script>
  import menu from '@/assets/menu/profile-menu.json';

  export default {
    data: () => ({
      menu: menu
    })
  }
</script>