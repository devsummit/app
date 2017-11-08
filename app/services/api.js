import axios from 'axios';
import querystring from 'qs';
import { API_BASE_URL } from '../constants';
import { getAccessToken } from '../helpers';

class Api {
  constructor(baseUrl, middleware = () => {}) {
    this.baseUrl = baseUrl;
    this.client = axios.create();
    middleware(this.client);
    this.client.interceptors.request.use((config) => {
      return config;
    });
    this.config = {
      headers: {}
    };
    this.id = new Date().getTime();

    this.client.interceptors.response.use(response => response);
  }

  getId() {
    return this.id;
  }
  put(url, json, qs = {}, config) {
    return this.sendRequest('PUT', url, { qs, json, config });
  }
  get(url, config = {}, qs) {
    return this.sendRequest('GET', url, { qs, config });
  }
  post(url, json, qs = {}, config = {}) {
    return this.sendRequest('POST', url, { qs, json, config });
  }
  patch(url, form, qs = {}, config = {}) {
    return this.sendRequest('PATCH', url, { qs, form, config });
  }
  delete(url, qs = {}, config = {}) {
    return this.sendRequest('DELETE', url, { qs, config });
  }
  setHeader(key, value) {
    this.config.headers[key] = value;
  }
  setAuthorizationToken(token) {
    this.setHeader('Authorization', `${token}`);
  }
  sendRequest(requestMethod, url, data = {}) {
    let headers = data.config ? data.config.headers || {} : {};
    headers = Object.assign({}, this.client.defaults.headers.common, this.config.headers, headers);

    return this.client
      .request(
        {
          method: requestMethod,
          url,
          baseURL: this.baseUrl,
          params: data.qs,
          data: data.json || querystring.stringify(data.form) || data.formData,
          headers: Object.assign(
            headers,
            data.json
              ? { 'Content-type': 'application/json' }
              : data.form
                ? { 'Content-Type': 'application/x-www-form-urlencoded' }
                : { 'Content-Type': 'multipart/form' }
          ),
          timeout: 60 * 1000,
          paramsSerializer: params => querystring.stringify(params),
          onUploadProgress: data.config.onUploadProgress || null,
        },
        data.config
      )
      .then(json => Promise.resolve(json))
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

// Guffy singleton of API

export default new Api(API_BASE_URL, () => {});
