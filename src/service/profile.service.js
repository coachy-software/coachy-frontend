import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import ObjectID from "bson-objectid";

const fetchOne = async payload => {
  return axios.get(`${API_URL}/profiles/${payload.identifier}`, authorization());
};

const fetchFollowing = async payload => {
  return axios.get(`${API_URL}/profiles/${payload.identifier}/following`, authorization());
};

const fetchFollowers = async payload => {
  return axios.get(`${API_URL}/profiles/${payload.identifier}/followers`, authorization());
};

const follow = async payload => {
  return axios.post(`${API_URL}/profiles/${payload.identifier}/follow`, {}, authorization());
};

const unfollow = async payload => {
  return axios.post(`${API_URL}/profiles/${payload.identifier}/unfollow`, {}, authorization());
};

const fetchRecommendations = async payload => {
  return axios.get(`${API_URL}/profiles/${payload.identifier}/recommendations`, authorization());
};

const createRecommendation = async payload => {
  return axios.post(`${API_URL}/recommendations`, payload, authorization());
};

const fetchRecommendation = async payload => {
  return axios.get(`${API_URL}/profiles/${ObjectID.generate()}/recommendations/${payload.identifier}`, authorization());
};

const changeVisibility = async payload => {
  return axios.post(`${API_URL}/profiles/${ObjectID.generate()}/recommendations/${payload.identifier}/visibility`, {visible: payload.visible}, authorization());
};

const requestRevision = async payload => {
  return axios.post(`${API_URL}/profiles/${ObjectID.generate()}/recommendations/${payload.identifier}/request-revision`, {}, authorization());
};

const commitRevision = async payload => {
  return axios.post(`${API_URL}/profiles/${ObjectID.generate()}/recommendations/${payload.identifier}/commit-revision`,
      {content: payload.content, rating: payload.rating}, authorization());
};

export default {
  fetchOne,
  fetchFollowing,
  fetchFollowers,
  follow,
  unfollow,
  fetchRecommendations,
  createRecommendation,
  fetchRecommendation,
  changeVisibility,
  requestRevision,
  commitRevision
}
