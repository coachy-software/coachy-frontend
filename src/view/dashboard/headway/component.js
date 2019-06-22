import HeadwayService from "@/service/headway.service";
import moment from "moment";
import Strength from "./component/strength/StrengthView";
import Build from "./component/build/BuildView";
import {notification} from "@/util/toastr.utils";
import {searchUserByUsername} from "@/service/user.service";
import {SweetModal, SweetModalTab} from "sweet-modal-vue";
import Selectize from "vue2-selectize";
import DeleteModal from "./component/delete/DeleteModal";

export default {
  data: () => ({
    headway: {},
    isLoading: true,
    suggestions: [],
    settings: {},
    shareToUser: '',
    isOwner: false
  }),
  components: {
    Build,
    Strength,
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab,
    Selectize,
    DeleteModal
  },
  created() {
    this.settings = {
      render: {
        option: (item, escape) => {
          let parsedItem = JSON.parse(item.value);
          return `<div><span class="image"><img src="${escape(parsedItem.avatar)}" alt=""></span><span class="title">${escape(
              parsedItem.displayName || parsedItem.username)}</span></div>`;
        },
      },
      load: (query, callback) => {
        if (!query.length) {
          return callback();
        }
        searchUserByUsername({username: encodeURIComponent(query)}).then(result => this.suggestions = result.data);
      }
    };

    this.fetchOne(this.$route.params.id);
  },
  methods: {
    share() {
      HeadwayService.share({identifier: this.$route.params.id, shareTo: JSON.parse(this.shareToUser).identifier})
      .then(() => {
        notification.success(this.$t('headway.shared'));
        this.closeModal();
      })
      .catch(() => notification.error(this.$t('headway.already_shared')))
    },
    deleteHeadway() {
      this.$store.dispatch('headway/remove', {identifier: this.headway.identifier})
      .then(() => this.$router.push('/dashboard/headway-journals?type=' + this.headway.type.toUpperCase()));
    },
    openModal() {
      this.$refs.modal.open();
    },
    closeModal() {
      this.$refs.modal.close();
    },
    fetchOne(id) {
      HeadwayService.fetchOne({identifier: id})
      .then(response => {
        this.headway = response.data;
        this.headway.measurements = this.headway.measurements.sort((a, b) => a.name.localeCompare(b.name));

        this.isOwner = JSON.parse(localStorage.getItem('user')).identifier === this.headway.ownerId;
        this.isLoading = false;
      });
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchOne(to.params.id);
    next();
  }
}
