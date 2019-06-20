import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";

const fetchMessages = async (payload) => {
  return await axios.get(`${API_URL}/messages/${payload.identifier}`, authorization())
};

export default {
  fetchMessages
}
