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

const SET_TOKEN = 'SET_TOKEN';
const SET_USER = 'SET_USER';
const SET_STATUS = 'SET_STATUS';

const NOT_LOGGED_IN = "NOT_LOGGED_IN";
const LOGGING_IN = "LOGGING_IN";
const LOGGED_IN = "LOGGED_IN";

const state = {
  token: localStorage.getItem("token") || undefined,
  user: JSON.parse(localStorage.getItem("user")) || undefined,
  status: NOT_LOGGED_IN
};

const mutations = {
  [SET_TOKEN]: (state, payload) => {
    state.token = payload;
  },

  [SET_USER]: (state, payload) => {
    state.user = payload;
  },

  [SET_STATUS]: (state, payload) => {
    state.status = payload;
  }
};

const actions = {
  login: ({commit}, {username, password}) => {
    return new Promise((resolve, reject) => {
      commit(SET_STATUS, LOGGING_IN);

      axios.post('http://localhost:3000/api/authenticate', {username: username, password: password}, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.data) {
          let base64Credentials = window.btoa(username + ":" + password);

          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", window.btoa(username + ":" + password));

          commit(SET_STATUS, LOGGED_IN);
          commit(SET_USER, response.data);
          commit(SET_TOKEN, base64Credentials);
        }

        resolve(response);
      })
      .catch(error => {
        commit(SET_STATUS, NOT_LOGGED_IN);
        reject(error);
      });

    });
  },

  register: () => {

  }
};

const getters = {
  isLoggedIn: (state) => {
    return state.user !== undefined;
  },
  isLoggingIn: (state) => {
    return state.status === LOGGING_IN
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
