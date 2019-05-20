import {helpers} from "vuelidate/src/validators";

export const API_URL = process.env.VUE_APP_API_URL;
export const WS_URL = process.env.VUE_APP_WS_URL;
export const NO_SPACE_AND_SPECIAL_CHARS = helpers.regex('NO_SPACE_AND_SPECIAL_CHARS', /^[a-zA-Z0-9]*$/);
export const NO_SPACE = helpers.regex('NO_SPACE', /^\S{0,}$/);
