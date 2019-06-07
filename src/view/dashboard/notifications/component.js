import NotificationService from "@/service/notifications.service";
import logo from "@/assets/dark-logo.svg";
import moment from "moment";
import {getInitials} from "@/util/user.utils";

export default {
  props: {
    page: {
      type: String,
      default: "1"
    }
  },
  data: () => ({
    numberOfElements: 5,
    loading: true,
    totalElements: 0,
    totalPages: 0,
    isFirst: false,
    isLast: false,
    logo: logo,
    notifications: [],
    userIdentifier: undefined
  }),
  created() {
    this.userIdentifier = JSON.parse(localStorage.getItem('user')).identifier;
    this.$watch(that => [that.numberOfElements, that.page], () => this.loadData(), {immediate: true});
    this.loading = false;
  },
  computed: {
    parsedPage() {
      return parseInt(this.page);
    }
  },
  methods: {
    getInitials(username) {
      return getInitials({username: username});
    },
    loadData() {
      return NotificationService.fetchAll({identifier: this.userIdentifier, page: this.page - 1, size: this.numberOfElements})
      .then(response => {
        let result = response.data;
        this.totalElements = result.totalElements;

        this.totalPages = result.totalPages;
        this.isLast = result.last;

        this.isFirst = result.first;
        this.notifications = result.content;

        return this.notifications;
      });
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}
