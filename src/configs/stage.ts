export const stage =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'https://localhost:44329/api/'
    : 'https://resto-flow-api.azurewebsites.net/api/'
