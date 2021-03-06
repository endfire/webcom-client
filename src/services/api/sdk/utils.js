import qs from 'qs';

export const invalidEndpointError = (message) =>
  new Error(`Tried creating an invalid endpoint (${message}).`);

export const getAuthEndpoint = ({ host, auth, port, route }) => {
  const endpoint = port
    ? [`${host}:${port}`, auth, route]
    : [host, auth, route];

  return endpoint.join('/');
};

export const getApiEndpoint = ({
  host,
  type,
  id,
  api = '',
  download = '',
  port = '',
  field = '',
  query = {},
} = {}) => {
  /* eslint-disable no-param-reassign */
  if (!host) throw invalidEndpointError('missing the \'host\' argument');
  if (!type) throw invalidEndpointError('missing the \'type\' argument');

  type = `/${type}`;
  query = qs.stringify(query);

  if (api) api = `/${api}`;
  if (download) download = `/${download}`;
  if (port) port = `:${port}`;
  if (id) id = `/${id}`;
  if (field) field = `/${field}`;
  if (query) query = `?${query}`;

  return [host, port, api, download, type, id, field, query].join('');
};

export function toJSON(res) {
  return res.json()
    .then(r => {
      if (res.status >= 400) {
        throw new Error(r.message);
      }
      return r;
    });
}
