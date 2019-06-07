import {API_URL} from "@/util/constants";
import axios from "axios";
import {authorization} from "@/util/headers";

const fetchAll = async (payload) => {
  return await axios.get(`${API_URL}/notifications/${payload.identifier}?page=${payload.page}&size=${payload.size}`, authorization());
};

export default {
  fetchAll
}
