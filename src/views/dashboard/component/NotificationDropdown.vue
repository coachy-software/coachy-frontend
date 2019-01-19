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
  .dropdown.d-none.d-md-flex.dropdown-element(:class="{'show': this.$parent.dropdowns.notification.open}", @click="$parent.toggleDropdown('notification')")
    .a.nav-link.icon.dropdown-element
      i.fe.fe-bell
      span.nav-unread
    .dropdown-menu.dropdown-menu-right.dropdown-menu-arrow(:class="{'show': this.$parent.dropdowns.notification.open}")
      div(v-for="value in notifications")
        router-link.dropdown-item.d-flex(:to="value.link")
          span.avatar.mr-3.align-self-center(:style="{'background-image': `url(${value.avatar})`}")
          div
            strong {{value.author}}
            |  {{value.message}}
            .small.text-muted {{value.time}}
      .dropdown-divider
      router-link.dropdown-item.text-center.text-muted-dark(to='/') Mark all as read
</template>

<script>
  import notificationMock from '@/assets/mock/notification-mock.json';

  export default {
    data: () => ({
      notifications: notificationMock
    })
  }
</script>
