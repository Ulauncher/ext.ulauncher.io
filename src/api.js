import authService from './auth0/AuthService'
import 'isomorphic-fetch'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const fetchApi = (url_part, options = {}, contentType = 'application/json') => {
  options.headers = { Accept: 'application/json' }
  if (authService.getToken()) {
    options.headers.Authorization = `Bearer ${authService.getToken()}`
  }
  if (contentType) {
    options.headers['Content-Type'] = contentType
  }

  return fetch(`${API_BASE_URL}${url_part}`, options).then(resp => {
    const contentType = resp.headers.get('Content-Type')
    if (contentType !== 'application/json') {
      throw new Error(`Unknown Content-Type ${contentType}`)
    }

    const jsonResp = resp.json()
    if (resp.ok) {
      return jsonResp
    } else {
      return jsonResp.then(errorData => Promise.reject(errorData))
    }
  })
}

export function checkManifest(url) {
  return fetchApi(`/check-manifest?url=${url}`)
}

export function uploadImages(formData) {
  return fetchApi(
    '/upload-images',
    {
      method: 'POST',
      body: formData
    },
    null
  )
}

export function submitExtension(data) {
  return fetchApi('/extensions', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function fetchItems() {
  return fetchApi('/extensions')
}

export function fetchMyItems() {
  return fetchApi('/my/extensions')
}

export function fetchItem(id) {
  return fetchApi(`/extensions/${id}`)
}
