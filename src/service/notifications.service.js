import {API_URL} from "@/util/constants";
import axios from "axios";
import {authorization} from "@/util/headers";

const fetchAll = async (payload) => {
  return await axios.get(`${API_URL}/notifications/${payload.identifier}?page=${payload.page}&size=${payload.size}`, authorization());
};

const markAsRead = async (payload) => {
  return await axios.post(`${API_URL}/notifications/${payload.identifier}/mark-as-read`, {}, authorization());
};

const hasAnyUnread = async (payload) => {
  return await axios.get(`${API_URL}/notifications/${payload.identifier}/has-unread`, authorization());
};

export default {
  fetchAll,
  markAsRead,
  hasAnyUnread
}
