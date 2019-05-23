import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import store from "@/store";

const create = async (payload) => {
  let request = await axios.post(`${API_URL}/headways`, payload, authorization());
  store.dispatch('headway/add', payload);
  return request;
};

export default {
  create
}
