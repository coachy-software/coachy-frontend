import {getInitials} from "@/util/user.utils";

export default {
  props: ['sentByOwner', 'user', 'message', 'date', 'typing'],
  methods: {
    getInitials(user) {
      return getInitials(user);
    }
  }
}
