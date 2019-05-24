import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";

const fetchOne = async (payload) => {
  return await axios.get(`${API_URL}/headways/${payload.identifier}`, authorization());
};

export default {
  fetchOne
}
