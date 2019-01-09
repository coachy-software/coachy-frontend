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

import router from '@/router.js'
import axios from "axios";

const SET_TOKEN = 'SET_TOKEN';
const SET_USER = 'SET_USER';
const SET_STATUS = 'SET_STATUS';

const state = {
  token: "",
  user: {},
  status: ""
};

const mutations = {
  [SET_TOKEN]: (state, payload) => {
    state.token = payload;
  },

  [SET_USER]: (state, {payload}) => {
    state.user = payload;
  },

  [SET_STATUS]: (state, payload) => {
    state.status = payload;
  }
};

const actions = {
  login: ({commit}, {username, password}) => {
    axios.post("http://localhost:3000/api/authenticate", {username: username, password: password}, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.data) {
        commit(SET_TOKEN, window.btoa(username + ":" + password));
        localStorage.setItem("token", JSON.stringify(response.data));
      }

      router.push("/");
      return response;
    })
    .catch(router.push("/login"));
  },

  register: () => {

  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}
