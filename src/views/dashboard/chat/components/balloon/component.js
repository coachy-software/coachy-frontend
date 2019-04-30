import {getInitials} from "@/utils/user.utils";

export default {
  props: ['sentByOwner', 'user', 'message', 'date'],
  methods: {
    getInitials(user) {
      return getInitials(user);
    }
  }
}
