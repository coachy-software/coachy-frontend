import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "../util/headers";

const fetchOne = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${payload.identifier}`, authorization())
};

const fetchFollowing = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${payload.identifier}/following`, authorization())
};

const fetchFollowers = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${payload.identifier}/followers`, authorization())
};

export default {
  fetchOne,
  fetchFollowing,
  fetchFollowers
}
