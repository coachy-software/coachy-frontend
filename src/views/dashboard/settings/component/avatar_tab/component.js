import {API_URL} from "@/utils/constants";
import axios from "axios";
import {notification} from "@/utils/toastr.utils";
import store from '@/store';
import {updateAccountDetails} from '@/service/user.service';
import {getErrorMessage} from "@/utils/validation.utils";
import i18n from "@/i18n";

function updateUser(avatar) {
  let user = store.state.user.user;

  updateAccountDetails({username: user.username, email: user.email, displayName: user.displayName, avatar: avatar})
  .then(() => notification.success(i18n.t('avatar_tab.updated')));
}

export default {
  data: () => ({
    uploadReady: true,
    file: null,
    filePreview: null,
    username: '',
    accountType: ''
  }),
  created() {
    let user = store.state.user.user;

    this.username = user.displayName || user.username;
    this.accountType = user.accountType;
    this.$parent.currentTab = this.$parent.tabs.avatar.name;
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
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
      formData.append('target', 'avatars');

      axios.post(`${API_URL}/uploads`, formData, config)
      .then(response => updateUser(response.headers.location))
      .catch(error => notification.error(getErrorMessage('avatar_tab', error)));
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
