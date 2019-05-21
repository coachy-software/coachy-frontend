import {API_URL} from "@/util/constants";
import axios from "axios";
import {notification} from "@/util/toastr.utils";
import store from '@/store';
import {updateAccountDetails} from '@/service/user.service';
import {getErrorMessage} from "@/util/validation.utils";
import i18n from "@/i18n";
import {SET_STATUS, LOADING, NOT_LOADING} from "@/store/modules/loader";

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

    this.$parent.currentTab = this.$parent.tabs.avatar.name;
    this.username = user.displayName || user.username;
    this.accountType = user.accountType;
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

      store.commit(SET_STATUS, LOADING);
      axios.post(`${API_URL}/uploads`, formData, config)
      .then(response => {
        updateUser(response.headers.location);
        store.commit(SET_STATUS, NOT_LOADING);
      })
      .catch(error => {
        notification.error(getErrorMessage('avatar_tab', error));
        store.commit(SET_STATUS, NOT_LOADING);
      });
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
