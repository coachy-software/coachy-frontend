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
      .then(response => updateUser(response.data.fileUrl))
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