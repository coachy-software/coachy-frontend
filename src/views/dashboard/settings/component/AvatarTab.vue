<template lang="pug">
  div
    form(@submit.prevent="update")
      .card-body
        h3.card-title Change or reset avatar
        .alert.alert-warning(role='alert')
          | #[i.fe.fe-bell.mr-2] Image size cannot be #[strong higher than 3MB].
          | Only files with following extensions are allowed: #[strong png jpg jpeg]
          br
          | If you want reset your avatar, just leave input empty and click at update button
        .row
          .col-sm-6.col-md-6
            .form-group
              .custom-file
                label.form-label File
                input(v-if="uploadReady" type="file", id="avatar", name="avatar", accept="image/png, image/jpeg", ref="file", @change="handleFileChange")
            .card-body.center
          .col-sm-6.col-md-6
            .form-group
              label.form-label Preview
              .media
                span.avatar.avatar-xl.mr-5(:style="{'background-image': `url(${this.filePreview})`}")
                .media-body
                  h4.m-0 {{this.username}}
                  p.text-muted.mb-0 {{this.accountType}}
      .card-footer.text-right
        button.btn.btn-primary.ml-2(v-if="file !== null", type='button', @click="resetInput") Reset
        button.btn.btn-primary.ml-2(type='submit') Update
</template>

<script>
  import {API_URL} from "@/utils/constants";
  import axios from "axios";
  import {notification} from "@/utils/toastr.utils";
  import store from '@/store';
  import {updateAccountDetails} from '@/service/user.service';

  let user = store.state.user.user;

  function updateUser(avatar) {
    updateAccountDetails({avatar: avatar})
    .then(() => notification.success("Updated avatar"))
    .catch(error => notification.error(error.message))
  }

  export default {
    data: () => ({
      uploadReady: true,
      file: null,
      filePreview: null,
      username: user.displayName || user.username,
      accountType: user.accountType
    }),
    mounted() {
      this.$parent.currentTab = this.$parent.tabs.avatar.name;
    },
    methods: {
      resetInput() {
        this.file = null;
        this.filePreview = null;
        this.uploadReady = false;

        this.$nextTick(() => {
          this.uploadReady = true
        })
      },
      update() {
        if (this.file === null) {
          updateUser("");
          return;
        }

        let config = {
          headers: {
            'Authorization': `Basic ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        };

        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('target', '/users/avatars');

        axios.post(`${API_URL}/uploads`, formData, config)
        .then(response => {
          updateUser(response.data.fileUrl);
        })
        .catch(error => notification.error(error.message));
      },
      handleFileChange() {
        this.file = this.$refs.file.files[0];
        this.filePreview = this.$refs.file.files[0];

        let reader = new FileReader();

        reader.onload = (event) => {
          this.filePreview = event.target.result;
        };
        reader.readAsDataURL(this.filePreview);
      },
    }
  }
</script>