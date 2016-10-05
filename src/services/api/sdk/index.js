import fetch from 'isomorphic-fetch';
import { getApiEndpoint, getAuthEndpoint, toJSON } from './utils';

export default class Sdk {
  postAndPatchHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  constructor({ host, api = 'api', auth = 'auth', download = 'download', port = '' }) {
    this.host = host;
    this.api = api;
    this.auth = auth;
    this.port = port;
    this.download = download;
  }

  find(type, query, options = {}) {
    const { host, api } = this;

    const endpoint = getApiEndpoint({
      host,
      api,
      type,
      query: {
        ...query,
        options,
      },
    });

    const request = {
      headers: {
        authorization: localStorage.token,
      },
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  fetch(type, id, options = {}) {
    const { host, api } = this;
    const endpoint = getApiEndpoint({
      host,
      api,
      type,
      id,
      query: {
        options,
      },
    });
    const request = {
      headers: {
        authorization: localStorage.token,
      },
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  fetchRelated(type, id, field, options) {
    const { host, api } = this;
    const endpoint = getApiEndpoint({
      host,
      api,
      type,
      id,
      field,
      query: {
        options,
      },
    });
    const request = {
      headers: {
        authorization: localStorage.token,
      },
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  create(type, payload) {
    const { host, api, postAndPatchHeaders } = this;
    const endpoint = getApiEndpoint({ host, api, type });
    const request = {
      method: 'POST',
      headers: {
        ...postAndPatchHeaders,
        authorization: localStorage.token,
      },
      body: JSON.stringify(payload),
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  update(type, id, payload) {
    const { host, api, postAndPatchHeaders } = this;
    const endpoint = getApiEndpoint({ host, api, type, id });
    const request = {
      method: 'PATCH',
      headers: {
        ...postAndPatchHeaders,
        authorization: localStorage.token,
      },
      body: JSON.stringify(payload),
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  archive(type, id) {
    const { host, api } = this;
    const endpoint = getApiEndpoint({ host, api, type, id });
    const request = {
      method: 'DELETE',
      headers: {
        authorization: localStorage.token,
      },
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  authenticate(route, type, payload) {
    const { host, auth, postAndPatchHeaders } = this;
    const endpoint = getAuthEndpoint({ host, auth, route });

    const request = {
      method: 'POST',
      headers: {
        ...postAndPatchHeaders,
        'user-type': type,
      },
      body: JSON.stringify(payload),
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  verify(type) {
    const { host, auth, postAndPatchHeaders } = this;
    const endpoint = getAuthEndpoint({ host, auth, route: 'verify' });

    const request = {
      method: 'POST',
      headers: {
        ...postAndPatchHeaders,
        'user-type': type,
      },
      body: JSON.stringify({ token: localStorage.token }),
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }

  downloadRecords(type) {
    const { host, download } = this;
    const endpoint = getApiEndpoint({ host, download, type });

    const request = {
      method: 'POST',
      headers: {
        authorization: localStorage.token,
      },
    };

    return fetch(endpoint, request)
      .then(toJSON);
  }
}
