const isLoggedIn = (state) => state.user !== undefined;
const user = (state) => state.user;

export default {
  isLoggedIn,
  user
}