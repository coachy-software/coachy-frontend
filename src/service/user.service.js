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
import {LOADING, NOT_LOADING, SET_STATUS} from "@/store/modules/loader";
import store from '@/store'

export function createResetPasswordToken({email}) {
  return new Promise((resolve, reject) => {
    store.commit(SET_STATUS, LOADING);
    axios.post(`${API_URL}/create-token/${email}`)
    .then(response => {
      store.commit(SET_STATUS, NOT_LOADING);
      resolve(response)
    })
    .catch(error => {
      store.commit(SET_STATUS, NOT_LOADING);
      reject(error)
    });
  });
}

export function resetPassword({token, password, confirmPassword}) {
  return new Promise((resolve, reject) => {
    store.commit(SET_STATUS, LOADING);
    axios.post(`${API_URL}/reset-password/${token}`, {password: password, confirmPassword: confirmPassword})
    .then(response => {
      store.commit(SET_STATUS, NOT_LOADING);
      resolve(response);
    })
    .catch(error => {
      store.commit(SET_STATUS, NOT_LOADING);
      reject(error);
    });
  });
}
