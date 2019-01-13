/*
 * MIT License
 *
 * Copyright (c) 2018 Coachy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import axios from "axios";
import {API_URL} from "@/utils/constants";
import {SET_TOKEN, SET_USER} from "./index";
import {LOADING, SET_STATUS, NOT_LOADING} from "@/store/modules/loader";

const login = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    let base64Credentials = window.btoa(payload.username + ":" + payload.password);

    axios.get(`${API_URL}/users/me`, {headers: {'Authorization': 'Basic ' + base64Credentials}})
    .then(response => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", window.btoa(payload.username + ":" + payload.password));

        commit(SET_STATUS, NOT_LOADING, {root: true});
        commit(SET_USER, response.data);
        commit(SET_TOKEN, base64Credentials);
      }

      resolve(response);
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error);
    });

  });
};

const register = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    axios.post(`${API_URL}/register`, {
      username: payload.username,
      password: payload.password,
      matchingPassword: payload.matchingPassword,
      email: payload.email,
      accountType: payload.accountType
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      resolve(response);
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error);
    });

  });
};

const logout = ({commit}) => {
  localStorage.removeItem("item");
  localStorage.removeItem("token");

  commit(SET_USER, undefined);
  commit(SET_TOKEN, undefined);
};

export default {
  login,
  register,
  logout
}