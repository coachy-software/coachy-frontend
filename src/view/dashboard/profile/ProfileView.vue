<template lang="pug" src="./template.pug"></template>
<script src="./component.js"></script>
<style scoped>
  .recommendation {
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
    top: 40%;
    bottom: 0;
    margin-top: auto !important;
    margin-bottom: auto;
  }

  .list-group-item .recommendation-button {
    visibility: hidden;
    opacity: 0;
    transition: opacity .2s, visibility .2s;
  }

  .recommendation:hover {
    display: block;
    background: rgba(0, 0, 0, .3);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .recommendation:hover .avatar {
    display: block;
    opacity: 0.1;
  }

  .recommendation:hover .recommendation-button {
    visibility: visible;
    opacity: 1;
  }

  .card-profile-img {
    min-width: 8rem !important;
    min-height: 8rem !important;
    max-width: 8rem !important;
    max-height: 8rem !important;
    line-height: 7rem;
    font-size: 2.5rem;
  }

</style>
