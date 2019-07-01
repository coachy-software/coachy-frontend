import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import ObjectID from "bson-objectid";

const fetchOne = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${payload.identifier}`, authorization())
};

const fetchFollowing = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${payload.identifier}/following`, authorization())
};

const fetchFollowers = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${payload.identifier}/followers`, authorization())
};

const follow = async (payload) => {
  return await axios.post(`${API_URL}/profiles/${payload.identifier}/follow`, {}, authorization())
};

const unfollow = async (payload) => {
  return await axios.post(`${API_URL}/profiles/${payload.identifier}/unfollow`, {}, authorization())
};

const fetchRecommendations = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${payload.identifier}/recommendations`, authorization())
};

const createRecommendation = async (payload) => {
  return await axios.post(`${API_URL}/recommendations`, payload, authorization());
};

const fetchRecommendation = async (payload) => {
  return await axios.get(`${API_URL}/profiles/${ObjectID.generate()}/recommendations/${payload.identifier}`, authorization())
};

export default {
  fetchOne,
  fetchFollowing,
  fetchFollowers,
  follow,
  unfollow,
  fetchRecommendations,
  createRecommendation,
  fetchRecommendation
}
