<template lang="pug" src="./template.pug"></template>
<script src="./component.js"></script>
<style scoped>
  .list-group-item {
    background: rgba(0, 0, 0, 0);
    transition: background 0.5s ease;
  }

  .btn-list {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .list-group-item .recommendation-button {
    visibility: hidden;
    opacity: 0;
    transition: opacity .2s, visibility .2s;
  }

  .list-group-item:hover {
    display: block;
    background: rgba(0, 0, 0, .3);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .list-group-item:hover .avatar {
    display: block;
    opacity: 0.1;
  }

  .list-group-item:hover .recommendation-button {
    visibility: visible;
    opacity: 1;
  }

</style>
