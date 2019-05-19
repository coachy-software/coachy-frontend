import {helpers} from "vuelidate/src/validators";

export const API_URL = "http://api.coachy.life/api";
export const NO_SPACE_AND_SPECIAL_CHARS = helpers.regex('NO_SPACE_AND_SPECIAL_CHARS', /^[a-zA-Z0-9]*$/);
export const NO_SPACE = helpers.regex('NO_SPACE', /^\S{0,}$/);
